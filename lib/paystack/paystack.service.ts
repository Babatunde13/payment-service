import validator from 'validator'
import { BaseResponse, BaseService } from '../base.service'
import {
    BulkChargeRequest,
    BulkChargeResponse,
    ChargeAuthorizationRequest,
    CreateChargeRequest,
    CreateChargeResponse,
    CreateCustomerRequest,
    CreateCustomerResponse,
    CreatePlanRequest,
    CreatePlanResponse,
    CreateDedicatedVirtualAccountRequest,
    CreateDedicatedVirtualAccountResponse,
    FetchCustomerResponse,
    GetBanksResponse,
    InitializeTransactionRequest,
    InitializeTransactionResponse,
    ListTransactionRequest,
    ListTransactionResponse,
    PayWithEftRequest,
    PayWithEftResponse,
    PayWithMobileMoneyRequest,
    PayWithMobileMoneyResponse,
    PayWithQRCodeRequest,
    PayWithQRCodeResponse,
    PayWithTransferRequest,
    PayWithTransferResponse,
    PayWithUSSDRequest,
    PayWithUSSDResponse,
    PaystackResponse,
    UpdateCustomerRequest,
    UpdateCustomerResponse,
    ValidateCustomerRequest,
    VerifyAccountNumberResponse,
    VerifyTransactionResponse,
    DVAEvents
} from './types'
import http from '../http'

class PaystackInputValidator {
    private static validateAccountNumber(accountNumber: string): boolean {
        return accountNumber.length === 10
    }

    private static validateBankCode(bankCode: string): boolean {
        return bankCode.length > 2
    }

    private static isEmail(email: string) {
        return validator.isEmail(email)
    }

    private static isUrl(url: string) {
        return validator.isURL(url)
    }

    public static validateResolveAccountInput(accountNumber: string, bankCode: string) {
        return this.validateAccountNumber(accountNumber) && this.validateBankCode(bankCode)
    }

    public static validateBankInput(bankCode: string) {
        return this.validateBankCode(bankCode)
    }

    public static validateInitializeTransactionInput(
        { email, amount, callback_url }: InitializeTransactionRequest
    ) {
        return this.isEmail(email) && amount > 1_000 && (callback_url ? this.isUrl(callback_url) : true)
    }
}

class BankService extends BaseService {
    protected baseUrl: string
    protected headers: { [key: string]: string }
    dvaEvents = DVAEvents

    constructor(secretKey: string) {
        super(secretKey, 'https://api.paystack.co/bank')
        this.headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${secretKey}`
        }
    }

    public async getBanks(payWithBank = false): BaseResponse<GetBanksResponse> {
        const url = this.buildUrlWithQueryParam(`${this.baseUrl}`, { pay_with_bank: payWithBank })
        const response = await http.get<GetBanksResponse>(url, this.headers)
        return response
    }

    public async verifyAccountNumber(
        accountNumber: string, bankCode: string
    ): BaseResponse<VerifyAccountNumberResponse> {
        if (!PaystackInputValidator.validateResolveAccountInput(accountNumber, bankCode)) {
            return { error: 'Invalid input, acc' }
        }

        const url = `${this.baseUrl}/resolve?account_number=${accountNumber}&bank_code=${bankCode}`
        const response = await http.get<VerifyAccountNumberResponse>(url, this.headers)
        return response
    }

    public async createDedicatedVirtualAccount(input: CreateDedicatedVirtualAccountRequest): BaseResponse<CreateDedicatedVirtualAccountResponse> {
        const url = `${this.baseUrl}/dedicated_account`
        const response = await http.post<CreateDedicatedVirtualAccountRequest, CreateDedicatedVirtualAccountResponse>(
            url, input, this.headers
        )

        return response
    }
}

class ChargeService extends BaseService {
    protected baseUrl: string
    protected headers: { [key: string]: string }

    constructor(secretKey: string) {
        super(secretKey, 'https://api.paystack.co/charge')
        this.headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${secretKey}`
        }
    }

    private validateBankInput(bank: CreateChargeRequest['bank']) {
        if ('account_number' in bank) {
            return PaystackInputValidator.validateResolveAccountInput(bank.account_number, bank.code)
        }

        return bank.phone.length === 11 && bank.code === '50211' && bank.token.length > 0
    }

    private validateCreateChargeInput(input: CreateChargeRequest) {
        const { email, amount, bank } = input
        return PaystackInputValidator.validateInitializeTransactionInput({ email, amount }) &&
            this.validateBankInput(bank)
    }

    public async createCharge(
        input: CreateChargeRequest
    ): BaseResponse<CreateChargeResponse> {
        if (!this.validateCreateChargeInput(input)) {
            return { error: 'Invalid input' }
        }

        const response = await http.post<CreateChargeRequest, CreateChargeResponse>(
            this.baseUrl, input, this.headers
        )

        return response
    }

    public async payWithTransfer(
        input: PayWithTransferRequest
    ): BaseResponse<PayWithTransferResponse> {
        const response = await http.post<PayWithTransferRequest, PayWithTransferResponse>(
            this.baseUrl, input, this.headers
        )

        return response
    }

    public async payWithUSSD(
        input: PayWithUSSDRequest
    ): BaseResponse<PayWithUSSDResponse> {
        const response = await http.post<PayWithUSSDRequest, PayWithUSSDResponse>(
            this.baseUrl, input, this.headers
        )

        return response
    }

    public async payWithMobileMoney(
        input: PayWithMobileMoneyRequest
    ): BaseResponse<PayWithMobileMoneyResponse> {
        const response = await http.post<PayWithMobileMoneyRequest, PayWithMobileMoneyResponse>(
            this.baseUrl, input, this.headers
        )

        return response
    }

    public async payWithEft(
        input: PayWithEftRequest
    ): BaseResponse<PayWithEftResponse> {
        const response = await http.post<PayWithEftRequest, PayWithEftResponse>(
            this.baseUrl, input, this.headers
        )

        return response
    }

    public async payWithQRCode(
        input: PayWithQRCodeRequest
    ): BaseResponse<PayWithQRCodeResponse> {
        const req: PayWithQRCodeRequest & { qr: { provider: string } } = { ...input, qr: { provider: '' } }
        if (input.currency === 'NGN') {
            req.qr = { provider: 'visa' }
        } else {
            req.qr = { provider: 'scan-to-pay' }
        }
        const response = await http.post<PayWithQRCodeRequest, PayWithQRCodeResponse>(
            this.baseUrl, req, this.headers
        )

        return response
    }

    public async bulkCharge(input: BulkChargeRequest): BaseResponse<BulkChargeResponse> {
        const url = 'https://api.paystack.co/bulkcharge'
        const response = await http.post<{ data: string }, BulkChargeResponse>(
            url, { data: JSON.stringify(input) }, this.headers
        )

        return response
    }
}

class TransactionService extends BaseService {
    protected baseUrl: string
    protected headers: { [key: string]: string }

    constructor(secretKey: string) {
        super(secretKey, 'https://api.paystack.co/transaction')
        this.headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${secretKey}`
        }
    }

    public async initializeTransaction({ email, amount, callback_url, metadata }: InitializeTransactionRequest) {
        if (!PaystackInputValidator.validateInitializeTransactionInput({ email, amount, callback_url })) {
            return { error: 'Invalid input' }
        }

        const url = `${this.baseUrl}/initialize`
        const response = await http.post<InitializeTransactionRequest, InitializeTransactionResponse>(
            url, { email, amount, callback_url, metadata }, this.headers
        )

        return response
    }

    public async verifyTransaction(reference: string): BaseResponse<VerifyTransactionResponse> {
        const url = `${this.baseUrl}/verify/${reference}`
        const response = await http.get<VerifyTransactionResponse>(url, this.headers)

        return response
    }

    public async chargeAuthorization(
        { email, amount, authorization_code, callback_url, metadata }: ChargeAuthorizationRequest
    ): BaseResponse<VerifyTransactionResponse> {
        if (!PaystackInputValidator.validateInitializeTransactionInput({ email, amount, callback_url }) || !authorization_code) {
            return { error: 'Invalid input' }
        }

        const url = `${this.baseUrl}/charge_authorization`
        const response = await http.post<ChargeAuthorizationRequest, VerifyTransactionResponse>(
            url, { email, amount, authorization_code, callback_url, metadata }, this.headers
        )

        return response
    }

    public async listTransactions(input: ListTransactionRequest): BaseResponse<ListTransactionResponse> {
        const url = this.buildUrlWithQueryParam(this.baseUrl, input)
        const response = await http.get<ListTransactionResponse>(url, this.headers)

        return response
    }
}

class SubscriptionService extends BaseService {
    protected baseUrl: string
    protected headers: { [key: string]: string }

    constructor(secretKey: string) {
        super(secretKey, 'https://api.paystack.co/subscription')
        this.headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${secretKey}`
        }
    }

    public async createPlan(input: CreatePlanRequest): BaseResponse<CreatePlanResponse> {
        const url = 'https://api.paystack.co/plan'
        const response = await http.post<CreatePlanRequest, CreatePlanResponse>(
            url, input, this.headers
        )

        return response
    }
}

class CustomerService extends BaseService {
    protected baseUrl: string
    protected headers: { [key: string]: string }

    constructor(secretKey: string) {
        super(secretKey, 'https://api.paystack.co/customer')
        this.headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${secretKey}`
        }
    }

    public async createCustomer(input: CreateCustomerRequest): BaseResponse<CreateCustomerResponse> {
        const response = await http.post<CreateCustomerRequest, CreateCustomerResponse>(
            this.baseUrl, input, this.headers
        )

        return response
    }

    public async getCustomer(customerId: string): BaseResponse<CreateCustomerResponse> {
        const url = `${this.baseUrl}/${customerId}`
        const response = await http.get<CreateCustomerResponse>(url, this.headers)

        return response
    }

    public async listCustomers(): BaseResponse<CreateCustomerResponse[]> {
        const response = await http.get<CreateCustomerResponse[]>(this.baseUrl, this.headers)

        return response
    }

    public async fetchCustomer(email_or_code: string): BaseResponse<FetchCustomerResponse> {
        const url = `${this.baseUrl}/${email_or_code}`
        const response = await http.get<FetchCustomerResponse>(url, this.headers)

        return response
    }

    public async updateCustomer(input: UpdateCustomerRequest, code: string): BaseResponse<UpdateCustomerResponse> {
        const url = `${this.baseUrl}/${code}`
        const response = await http.put<UpdateCustomerRequest, UpdateCustomerResponse>(
            url, input, this.headers
        )

        return response
    }

    /**
     * 
     *When this API is called a webhook is sent to the webhook URL. It can either be a
     customeridentification.failed or customeridentification.success event.
     If failed there's a reason field in the data object that explains why the identification failed.
     There's a customer id and customer code in the data object that can be used to identify the customer.
     sample response 
     ```json
     {
        "event": "customeridentification.failed",
        "data": {
            "customer_id": 82796315,
            "customer_code": "CUS_XXXXXXXXXXXXXXX",
            "email": "email@email.com",
            "identification": {
                "country": "NG",
                "type": "bank_account",
                "bvn": "123*****456",
                "account_number": "012****345",
                "bank_code": "999991"
            },
            "reason": "Account number or BVN is incorrect"
        }
    }
     ```
     */
    public async validateCustomer(code: string, input: ValidateCustomerRequest): BaseResponse<PaystackResponse<unknown>> {
        const url = `${this.baseUrl}/${code}/identification`
        const response = await http.post<ValidateCustomerRequest, PaystackResponse<unknown>>(url, input, this.headers)

        return response
    }

    public async whitelistCustomer(code: string): BaseResponse<UpdateCustomerResponse> {
        const url = `${this.baseUrl}/set_risk_action`
        const response = await http.post<{ customer: string, risk_action: 'allow' }, UpdateCustomerResponse>(
            url, { customer: code, risk_action: 'allow' }, this.headers
        )

        return response
    }

    public async blacklistCustomer(code: string): BaseResponse<UpdateCustomerResponse> {
        const url = `${this.baseUrl}/set_risk_action`
        const response = await http.post<{ customer: string, risk_action: 'deny' }, UpdateCustomerResponse>(
            url, { customer: code, risk_action: 'deny' }, this.headers
        )

        return response
    }

    public async deactivateAuthorization(authorization_code: string): BaseResponse<PaystackResponse<unknown>> {
        const url = `${this.baseUrl}/deactivate_authorization`
        const response = await http.post<{ authorization_code: string }, PaystackResponse<unknown>>(
            url, { authorization_code }, this.headers
        )

        return response
    }
}

class MiscService extends BaseService {
    protected baseUrl: string
    protected headers: { [key: string]: string }

    constructor(secretKey: string) {
        super(secretKey, 'https://api.paystack.co')
        this.headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${secretKey}`
        }
    }

    public async resolveBVN(bvn: string) {}
    public async resolveCardBin(bin: string) {}
    public async resolvePhone(phone: string) {}
    public async resolveTransferRecipient(recipientCode: string) {}
}

export class PaystackService {
    public bankService: BankService
    public transactionService: TransactionService
    public chargeService: ChargeService
    public subscriptionService: SubscriptionService
    public customerService: CustomerService
    public miscService: MiscService

    constructor(secretKey: string) {
        this.bankService = new BankService(secretKey)
        this.transactionService = new TransactionService(secretKey)
        this.chargeService = new ChargeService(secretKey)
        this.subscriptionService = new SubscriptionService(secretKey)
        this.customerService = new CustomerService(secretKey)
        this.miscService = new MiscService(secretKey)
    }
}

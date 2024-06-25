import { BaseResponse, BaseService } from '../base.service'
import { BulkChargeRequest, BulkChargeResponse, ChargeAuthorizationRequest, CreateChargeRequest, CreateChargeResponse, CreateCustomerRequest, CreateCustomerResponse, CreatePlanRequest, CreatePlanResponse, CreateDedicatedVirtualAccountRequest, CreateDedicatedVirtualAccountResponse, FetchCustomerResponse, GetBanksResponse, InitializeTransactionRequest, InitializeTransactionResponse, ListTransactionRequest, ListTransactionResponse, PayWithEftRequest, PayWithEftResponse, PayWithMobileMoneyRequest, PayWithMobileMoneyResponse, PayWithQRCodeRequest, PayWithQRCodeResponse, PayWithTransferRequest, PayWithTransferResponse, PayWithUSSDRequest, PayWithUSSDResponse, PaystackResponse, UpdateCustomerRequest, UpdateCustomerResponse, ValidateCustomerRequest, VerifyAccountNumberResponse, VerifyTransactionResponse, DVAEvents } from './types'
declare class BankService extends BaseService {
    protected baseUrl: string
    protected headers: {
        [key: string]: string;
    }
    dvaEvents: typeof DVAEvents
    constructor(secretKey: string);
    getBanks(payWithBank?: boolean): BaseResponse<GetBanksResponse>;
    verifyAccountNumber(accountNumber: string, bankCode: string): BaseResponse<VerifyAccountNumberResponse>;
    createDedicatedVirtualAccount(input: CreateDedicatedVirtualAccountRequest): BaseResponse<CreateDedicatedVirtualAccountResponse>;
}
declare class ChargeService extends BaseService {
    protected baseUrl: string
    protected headers: {
        [key: string]: string;
    }
    constructor(secretKey: string);
    private validateBankInput
    private validateCreateChargeInput
    createCharge(input: CreateChargeRequest): BaseResponse<CreateChargeResponse>;
    payWithTransfer(input: PayWithTransferRequest): BaseResponse<PayWithTransferResponse>;
    payWithUSSD(input: PayWithUSSDRequest): BaseResponse<PayWithUSSDResponse>;
    payWithMobileMoney(input: PayWithMobileMoneyRequest): BaseResponse<PayWithMobileMoneyResponse>;
    payWithEft(input: PayWithEftRequest): BaseResponse<PayWithEftResponse>;
    payWithQRCode(input: PayWithQRCodeRequest): BaseResponse<PayWithQRCodeResponse>;
    bulkCharge(input: BulkChargeRequest): BaseResponse<BulkChargeResponse>;
}
declare class TransactionService extends BaseService {
    protected baseUrl: string
    protected headers: {
        [key: string]: string;
    }
    constructor(secretKey: string);
    initializeTransaction({ email, amount, callback_url, metadata }: InitializeTransactionRequest): Promise<{
        data: InitializeTransactionResponse;
        error?: undefined;
    } | {
        error: any;
        data?: undefined;
    }>;
    verifyTransaction(reference: string): BaseResponse<VerifyTransactionResponse>;
    chargeAuthorization({ email, amount, authorization_code, callback_url, metadata }: ChargeAuthorizationRequest): BaseResponse<VerifyTransactionResponse>;
    listTransactions(input: ListTransactionRequest): BaseResponse<ListTransactionResponse>;
}
declare class SubscriptionService extends BaseService {
    protected baseUrl: string
    protected headers: {
        [key: string]: string;
    }
    constructor(secretKey: string);
    createPlan(input: CreatePlanRequest): BaseResponse<CreatePlanResponse>;
}
declare class CustomerService extends BaseService {
    protected baseUrl: string
    protected headers: {
        [key: string]: string;
    }
    constructor(secretKey: string);
    createCustomer(input: CreateCustomerRequest): BaseResponse<CreateCustomerResponse>;
    getCustomer(customerId: string): BaseResponse<CreateCustomerResponse>;
    listCustomers(): BaseResponse<CreateCustomerResponse[]>;
    fetchCustomer(email_or_code: string): BaseResponse<FetchCustomerResponse>;
    updateCustomer(input: UpdateCustomerRequest, code: string): BaseResponse<UpdateCustomerResponse>;
    validateCustomer(code: string, input: ValidateCustomerRequest): BaseResponse<PaystackResponse<unknown>>;
    whitelistCustomer(code: string): BaseResponse<UpdateCustomerResponse>;
    blacklistCustomer(code: string): BaseResponse<UpdateCustomerResponse>;
    deactivateAuthorization(authorization_code: string): BaseResponse<PaystackResponse<unknown>>;
}
declare class MiscService extends BaseService {
    protected baseUrl: string
    protected headers: {
        [key: string]: string;
    }
    constructor(secretKey: string);
    resolveBVN(bvn: string): Promise<void>;
    resolveCardBin(bin: string): Promise<void>;
    resolvePhone(phone: string): Promise<void>;
    resolveTransferRecipient(recipientCode: string): Promise<void>;
}
export declare class PaystackService {
    bankService: BankService
    transactionService: TransactionService
    chargeService: ChargeService
    subscriptionService: SubscriptionService
    customerService: CustomerService
    miscService: MiscService
    constructor(secretKey: string);
}
export {}

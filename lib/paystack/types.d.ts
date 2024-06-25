import { Any } from '../base.service'
export interface PaystackResponse<T> {
    status: boolean;
    message: string;
    data: T;
}
declare enum Channel {
    CARD = 'card'
}
declare enum PlanInterval {
    HOURLY = 'hourly',
    DAILY = 'daily',
    WEEKLY = 'weekly',
    MONTHLY = 'monthly',
    QUARTERLY = 'quarterly',
    BIANNUALLY = 'biannually',
    YEARLY = 'yearly'
}
declare enum Currency {
    NGN = 'NGN',
    USD = 'USD',
    GHS = 'GHS',
    ZAR = 'ZAR',
    KES = 'KES'
}
declare enum BankType {
    NUBAN = 'nuban'
}
export declare enum DVAEvents {
    SUCCESSFUL_CUSTOMER_IDENTIFICATION = 'customeridentification.success',
    FAILED_CUSTOMER_IDENTIFICATION = 'customeridentification.failed',
    SUCCESSFUL_DVA_ASSIGNMENT = 'dedicatedaccount.assign.success',
    FAILED_DVA_ASSIGNMENT = 'dedicatedaccount.assign.failed'
}
export declare enum TransactionStatus {
    ABANDONED = 'abandoned',
    FAILED = 'failed',
    ONGOING = 'ongoing',
    PENDING = 'pending',
    PROCESSING = 'processing',
    QUEUED = 'queued',
    REVERSED = 'reversed',
    SUCCESS = 'success'
}
export declare enum USSD {
    GTBANK = '737',
    UBA = '919',
    Sterling = '822',
    Zenith = '966'
}
export declare type CreateCustomerRequest = {
    email: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
};
export declare type UpdateCustomerRequest = {
    first_name?: string;
    last_name?: string;
    phone?: string;
    metadata?: Any;
};
export declare type ValidateCustomerRequest = {
    country: 'NG' | 'GH' | 'KE' | 'ZA';
    type: 'bank_account';
    account_number: string;
    bank_code: string;
    bvn: string;
    first_name: string;
    last_name: string;
};
export declare type CreateDedicatedVirtualAccountRequest = {
    customer: string;
    preferred_bank: 'titan-paystack' | 'wema' | 'test-bank';
};
export declare type InitializeTransactionRequest = Pay & {
    callback_url?: string;
    metadata?: Any;
};
export declare type CreateChargeRequest = Pay & {
    bank: {
        account_number: string;
        code: string;
    } | {
        phone: string;
        code: '50211';
        token: string;
    };
};
export declare type PayWithTransferRequest = Pay & {
    bank_transfer: {
        account_expires_at: string;
    };
};
export declare type PayWithUSSDRequest = Pay & {
    type: USSD;
    metadata?: Any;
};
export declare type PayWithMobileMoneyRequest = Pay & {
    currency: Currency.GHS | Currency.KES;
    mobile_money: {
        provider: 'mtn' | 'atl' | 'vod' | 'mpesa';
        phone: string;
    };
};
export declare type PayWithEftRequest = Pay & {
    eft: {
        provider: string;
    };
};
export declare type PayWithQRCodeRequest = Pay & {
    currency: Currency.NGN | Currency.ZAR;
};
export interface ChargeAuthorizationRequest {
    email: string;
    amount: number;
    authorization_code: string;
    callback_url?: string;
    metadata?: {
        cancel_action?: string;
    };
}
export interface ListTransactionRequest {
    from?: string;
    to?: string;
    perPage?: number;
    page?: number;
    customer?: string;
    terminalid?: string;
    status?: TransactionStatus;
    amount?: number;
}
export declare type BulkChargeRequest = {
    amount: number;
    authorization: string;
    reference: string;
}[];
export interface CreatePlanRequest {
    name: string;
    amount: number;
    interval: PlanInterval;
}
interface Bank {
    name: string;
    slug: string;
    code: string;
    longcode: string;
    gateway: string | null;
    pay_with_bank: boolean;
    active: boolean;
    is_deleted: boolean;
    country: string;
    currency: Currency;
    type: BankType;
    id: number;
    createdAt: string;
    updatedAt: string;
}
interface Subscription {
    id: number;
    domain: string;
    status: string;
    customer: Customer;
    plan: Plan;
    authorization: Authorization;
    createdAt: string;
    updatedAt: string;
}
interface ResolveAccount {
    account_number: string;
    account_name: string;
    bank_code: number;
}
interface CreateCharge {
    display_text: string;
    reference: string;
    status: string;
}
interface InitializeTransaction {
    authorization_url: string;
    access_code: string;
    reference: string;
}
interface Authorization {
    authorization_code: string;
    bin: string;
    last4: string;
    exp_month: string;
    exp_year: string;
    channel: string;
    card_type: string;
    bank: string;
    country_code: string;
    brand: string;
    reusable: boolean;
    signature: string;
    account_name: string;
}
interface Customer {
    id: number;
    customer_code: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    integration: number;
    domain: string;
    identifications?: string;
    identified: boolean;
    metadata: Any;
    risk_action: string;
    createdAt: string;
    updatedAt: string;
}
interface FullCustomer extends Customer {
    transactions: VerifyTransaction[];
    subscriptions: Subscription[];
    authorizations: Authorization[];
    total_transactions: number;
    total_transaction_value: Any[];
    dedicaated_account: Any;
}
interface DedicatedVirtualAccount {
    bank: {
        name: string;
        id: number;
        slug: 'titan-paystack' | 'wema';
    };
    account_name: string;
    account_number: string;
    assigned: boolean;
    currency: Currency;
    metadata: Any;
    active: boolean;
    id: number;
    created_at: string;
    updated_at: string;
    assignment: {
        integration: number;
        assignee_id: number;
        assignee_type: string;
        expired: boolean;
        account_type: string;
        assigned_at: string;
    };
    customer: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        customer_code: string;
        phone: string;
        risk_action: string;
    };
}
interface Plan {
    id: number;
    name: string;
    interval: PlanInterval;
    amount: number;
    integration: number;
    domain: string;
    currency: Currency;
    plan_code: string;
    invoice_limit: number;
    send_invoices: boolean;
    send_sms: boolean;
    hosted_page: boolean;
    migrate: boolean;
    start_date?: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}
interface VerifyTransaction {
    id: number;
    domain: string;
    status: TransactionStatus;
    reference: string;
    amount: number;
    message: string;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: Channel;
    currency: Currency;
    ip_address: string;
    metadata: string;
    log: Any;
    fees: number;
    fees_split: Any;
    authorization: Authorization;
    customer: Customer;
    plan?: Plan;
    order_id: string;
    createdAt: string;
    requested_amount: number;
    transaction_date: string;
    plan_object: Any;
    subaccount: Any;
}
interface Pay {
    email: string;
    amount: number;
}
interface PayWithTransfer {
    status: string;
    display_text: string;
    reference: string;
    amount: number;
    account_name: string;
    account_number: string;
    bank: {
        slug: string;
        name: string;
        id: number;
    };
    account_expires_at: string;
}
interface PayWithUSSD {
    status: string;
    reference: string;
    display_text: string;
    ussd_code: string;
}
interface PayWithMobileMoney {
    status: string;
    reference: string;
    display_text: string;
}
interface PayWithEft {
    status: string;
    reference: string;
    url: string;
}
interface PayWithQRCode {
    status: string;
    reference: string;
    url: string;
    qr_code: string;
}
interface BulkCharge {
    batch_code: string;
    reference: string;
    id: number;
    integration: number;
    domain: string;
    status: string;
    total_charges: number;
    pending_charges: number;
    createdAt: string;
    updatedAt: string;
}
export declare type GetBanksResponse = PaystackResponse<Bank[]>;
export declare type VerifyAccountNumberResponse = PaystackResponse<ResolveAccount>;
export declare type VerifyTransactionResponse = PaystackResponse<VerifyTransaction>;
export declare type InitializeTransactionResponse = PaystackResponse<InitializeTransaction>;
export declare type ChargeAuthorizationResponse = PaystackResponse<VerifyTransaction>;
export declare type ListTransactionResponse = PaystackResponse<VerifyTransaction[]>;
export declare type CreateChargeResponse = PaystackResponse<CreateCharge>;
export declare type PayWithTransferResponse = PaystackResponse<PayWithTransfer>;
export declare type PayWithUSSDResponse = PaystackResponse<PayWithUSSD>;
export declare type PayWithMobileMoneyResponse = PaystackResponse<PayWithMobileMoney>;
export declare type PayWithEftResponse = PaystackResponse<PayWithEft>;
export declare type PayWithQRCodeResponse = PaystackResponse<PayWithQRCode>;
export declare type BulkChargeResponse = PaystackResponse<BulkCharge>;
export declare type CreatePlanResponse = PaystackResponse<Plan>;
export declare type CreateCustomerResponse = PaystackResponse<Customer>;
export declare type ListCustomersResponse = PaystackResponse<Customer[]>;
export declare type FetchCustomerResponse = PaystackResponse<FullCustomer>;
export declare type UpdateCustomerResponse = PaystackResponse<Customer>;
export declare type CreateDedicatedVirtualAccountResponse = PaystackResponse<DedicatedVirtualAccount>;
export {}

import { BaseResponse } from '../base.service'

type BudpaySuccessResponse<T> = {
    success: boolean
    status: boolean
    code: string
    message: string
    data: T
}

export interface AirtimeTopupRequest {
    provider: string
    amount: string
    number: string
    reference?: string
}

export interface InternetTopupRequest {
    provider: string
    number: string
    plan_id: string
    reference: string
}

export interface ElectricityMeterValidationRequest {
    provider: string
    type: 'prepaid' | 'postpaid'
    number: string
}

export interface ElectricityTopupRequest {
    provider: string
    number: string
    type: 'prepaid' | 'postpaid'
    amount: string
    reference: string
}

export interface TVValidationRequest {
    provider: string
    number: string
}

export interface TVTopupRequest {
    provider: string
    number: string
    package_id: string
    reference: string
}

export interface VerifyAccountNameRequest {
    bank_code: string
    account_number: string
}

export interface VerifyBVNRequest {
    bvn: string
    first_name: string
    middle_name: string
    last_name: string
    phone_number: string
    dob: string
    gender: string
    reference: string
    callback_url: string
}

interface AirtimeProvider {
    provider: string
    providerLogoUrl: string
    minAmount: string
    maxAmount: string
}

interface AirtimeTopup {
    orderNo: string
    reference: string
    status: string
    errorMsg: string | null
}

interface InternetProvider {
    id: number
    provider: string
    providerLogoUrl: string
}

interface InternetProviderPlan {
    id: number
    name: string
    amount: string
}

type InternetTopup = AirtimeTopup

interface ElectricityProvider {
    provider: string
    code: string
    providerLogoUrl: string
    minAmount: string
}

interface ValidateMeter {
    number: string
    provider: string
    type: string
    Customer_Name: string
}

type ElectricityTopup = InternetTopup & {
    purchased_code: string
    units: string
}

interface TVProvider {
    provider: string
    providerLogoUrl: string
}

type TVProviderPackage = {
    id: number
    name: string
    code: string
    amount: string
}

type TVValidation = AirtimeTopup
type TVTopup = AirtimeTopup

export type AirtimeProvidersResponse = BudpaySuccessResponse<AirtimeProvider[]>
export type AirtimeTopupResponse = BudpaySuccessResponse<AirtimeTopup>
export type InternetProvidersResponse = BudpaySuccessResponse<InternetProvider[]>
export type InternetProviderPlansResponse = BudpaySuccessResponse<InternetProviderPlan[]>
export type InternetTopupResponse = BudpaySuccessResponse<InternetTopup>
export type ElectricityProvidersResponse = BudpaySuccessResponse<ElectricityProvider[]>
export type ElectricityMeterValidationResponse = BudpaySuccessResponse<ValidateMeter>
export type ElectricityTopupResponse = BudpaySuccessResponse<ElectricityTopup>
export type TVProvidersResponse = BudpaySuccessResponse<TVProvider[]>
export type TVProviderPackagesResponse = BudpaySuccessResponse<TVProviderPackage[]>
export type TVValidationResponse = BudpaySuccessResponse<TVValidation>
export type TVTopupResponse = BudpaySuccessResponse<TVTopup>
export type VerifyAccountNameResponse = BudpaySuccessResponse<string>
export type VerifyBVNResponse = BaseResponse<{ success: boolean; message: string; reference: string }>

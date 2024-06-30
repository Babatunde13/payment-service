import crypto from 'crypto'
import { Any, BaseService } from '../base.service'
import http from '../http'
import {
    BudpayBaseResponse,
    AirtimeProvidersResponse,
    AirtimeTopupRequest,
    AirtimeTopupResponse,
    ElectricityMeterValidationRequest,
    ElectricityMeterValidationResponse,
    ElectricityProvidersResponse,
    ElectricityTopupRequest,
    ElectricityTopupResponse,
    InternetProviderPlansResponse,
    InternetProvidersResponse,
    InternetTopupRequest,
    InternetTopupResponse,
    TVProvidersResponse,
    TVProviderPackagesResponse,
    TVValidationRequest,
    TVValidationResponse,
    TVTopupRequest,
    TVTopupResponse,
    VerifyAccountNameRequest,
    VerifyAccountNameResponse,
    VerifyBVNRequest,
    VerifyBVNResponse,
} from './types'

class BudpayBaseService extends BaseService {
    headers: { [key: string]: string }
    protected baseUrl: string

    constructor(secretKey: string, path: string) {
        super(secretKey)
        this.baseUrl = path ? `https://api.budpay.com/api/v2/${path}` : 'https://api.budpay.com/api/v2'
        this.headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${secretKey}`
        }
    }

    private generateSignature = (body: Record<string, Any>) => {
        const sortedPayload: Record<string, Any> = {}
        Object.keys(body).sort().forEach(key => {
            sortedPayload[key] = body[key]
        })

        const payloadString = Object.keys(sortedPayload)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(sortedPayload[key])}`)
            .join('&')

        const hmac = crypto.createHmac('sha512', this.secretKey)
        hmac.update(payloadString)
        const signature = hmac.digest('hex')

        return signature
    }

    protected constructHeadersWithSignature = (body: Record<string, Any>) => {
        this.headers = {
            ...this.headers,
            Encryption: this.generateSignature(body)
        }
    }
}

class AirtimeService extends BudpayBaseService {
    constructor(secretKey: string) {
        super(secretKey, 'airtime')
    }

    public getAirtimeProviders = async (): BudpayBaseResponse<AirtimeProvidersResponse> => {
        const response = await http.get<AirtimeProvidersResponse>(this.baseUrl, this.headers)
        return response
    }

    public purchaseAirtime = async (data: AirtimeTopupRequest): BudpayBaseResponse<Any> => {
        this.constructHeadersWithSignature(data)
        const response = await http.post<AirtimeTopupRequest, AirtimeTopupResponse>(
            `${this.baseUrl}/topup`, data, this.headers
        )

        return response
    }
}

class InternetService extends BudpayBaseService {
    constructor(secretKey: string) {
        super(secretKey, 'internet')
    }

    public getInternetProviders = async (): BudpayBaseResponse<InternetProvidersResponse> => {
        const response = await http.get<InternetProvidersResponse>(this.baseUrl, this.headers)
        return response
    }

    public getInternetProviderPlans = async (provider: string): BudpayBaseResponse<InternetProviderPlansResponse> => {
        const response = await http.get<InternetProviderPlansResponse>(`${this.baseUrl}/plans/${provider}`, this.headers)
        return response
    }

    public purchaseInternet = async (data: InternetTopupRequest): BudpayBaseResponse<InternetTopupResponse> => {
        this.constructHeadersWithSignature(data)
        const response = await http.post<InternetTopupRequest, InternetTopupResponse>(
            this.baseUrl, data, this.headers
        )

        return response
    }
}

class ElectricityService extends BudpayBaseService {
    constructor(secretKey: string) {
        super(secretKey, 'electricity')
    }

    public getElectricityProviders = async (): BudpayBaseResponse<ElectricityProvidersResponse> => {
        const response = await http.get<ElectricityProvidersResponse>(this.baseUrl, this.headers)
        return response
    }

    public validateMeterNumber = async (data: ElectricityMeterValidationRequest): BudpayBaseResponse<ElectricityMeterValidationResponse> => {
        const response = await http.post<ElectricityMeterValidationRequest, ElectricityMeterValidationResponse>(
            `${this.baseUrl}/validate`, data, this.headers
        )

        return response
    }

    public purchaseElectricity = async (data: ElectricityTopupRequest): BudpayBaseResponse<ElectricityTopupResponse> => {
        this.constructHeadersWithSignature(data)
        const response = await http.post<ElectricityTopupRequest, ElectricityTopupResponse>(
            `${this.baseUrl}/recharge`, data, this.headers
        )

        return response
    }
}

class TvService extends BudpayBaseService {
    constructor(secretKey: string) {
        super(secretKey, 'tv')
    }

    public getTVProviders = async (): BudpayBaseResponse<TVProvidersResponse> => {
        const response = await http.get<TVProvidersResponse>(this.baseUrl, this.headers)
        return response
    }

    public getTVProviderPackages = async (provider: string): BudpayBaseResponse<TVProviderPackagesResponse> => {
        const response = await http.get<TVProviderPackagesResponse>(`${this.baseUrl}/packages/${provider}`, this.headers)
        return response
    }

    public validateTV = async (data: TVValidationRequest): BudpayBaseResponse<TVValidationResponse> => {
        const response = await http.post<TVValidationRequest, Any>(
            `${this.baseUrl}/validate`, data, this.headers
        )

        return response
    }

    public initiateTVTopup = async (data: TVTopupRequest): BudpayBaseResponse<TVTopupResponse> => {
        this.constructHeadersWithSignature(data)
        const response = await http.post<TVTopupRequest, TVTopupResponse>(
            `${this.baseUrl}/pay`, data, this.headers
        )

        return response
    }
}

class BillsPaymentService {
    public airtimeService: AirtimeService
    public internetService: InternetService
    public electricityService: ElectricityService
    public tvService: TvService

    constructor(secretKey: string) {
        this.airtimeService = new AirtimeService(secretKey)
        this.internetService = new InternetService(secretKey)
        this.electricityService = new ElectricityService(secretKey)
        this.tvService = new TvService(secretKey)
    }
}

class IdentityVerificationService extends BudpayBaseService {
    constructor(secretKey: string) {
        super(secretKey, '')
    }

    public verifyAccountName = async (data: VerifyAccountNameRequest): BudpayBaseResponse<VerifyAccountNameResponse> => {
        const response = await http.post<VerifyAccountNameRequest, VerifyAccountNameResponse>(
            `${this.baseUrl}/account_name_verify`, data, this.headers
        )

        return response
    }

    public verifyBVN = async (data: VerifyBVNRequest): BudpayBaseResponse<VerifyBVNResponse> => {
        const response = await http.post<VerifyBVNRequest, VerifyBVNResponse>(
            `${this.baseUrl}/bvn/verify`, data, this.headers
        )
        return response
    }
}

export class BudpayService {
    public billPaymentService: BillsPaymentService
    public identityVerificationService: IdentityVerificationService

    constructor(secretKey: string) {
        this.billPaymentService = new BillsPaymentService(secretKey)
        this.identityVerificationService = new IdentityVerificationService(secretKey)
    }
}

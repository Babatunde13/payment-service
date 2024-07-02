import { AppError } from './error'

export class BaseService {
    protected secretKey: string

    constructor(secretKey: string) {
        if (!secretKey) {
            throw new Error('Secret key is required')
        }

        this.secretKey = secretKey
    }

    buildUrlWithQueryParam = (url: string, query: { [key: string]: Any }) => {
        let urlWithQueryParam = url
        Object.keys(query).forEach(key => {
            if (urlWithQueryParam.includes('?')) {
                urlWithQueryParam += `&${key}=${query[key]}`
            } else {
                urlWithQueryParam += `?${key}=${query[key]}`
            }
        })

        return urlWithQueryParam
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any

type Response<SuccessRes> =
    {
        data: SuccessRes
        error?: undefined
    } |{
        data?: undefined
        error: AppError
    }

export type BaseResponse<SuccessRes> = Promise<Response<SuccessRes>>

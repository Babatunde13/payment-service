export class BaseService {
    protected secretKey: string

    constructor(secretKey: string, baseUrl: string) {
        if (!secretKey) {
            throw new Error('Secret key is required')
        }

        if (!baseUrl) {
            throw new Error('Base URL is required')
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

export type Any = any

type Response<T> =
    {
        data: T
        error?: undefined
    } |{
        data?: undefined
        error: Any
    }

export type BaseResponse<T> = Promise<Response<T>>
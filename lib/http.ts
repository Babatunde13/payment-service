import axios, { AxiosError } from 'axios'
import { Any } from './base.service'

class Http {
    private async makeRequest<Req, Res>({
        url, method, headers, body
    }: {
        url: string,
        method: 'post' | 'get' | 'put' | 'delete',
        body?: Req,
        headers?: { [key: string]: string },
    }){
        try {
            const request = await axios.request<Res>({
                method, url, data: body, headers: headers || {}
            })
    
            const { data } = request
    
            return { data }
        } catch (err) {
            const errorResponse = err as AxiosError
            let error: Any
            if (error.response) {
                error = errorResponse.response?.data
            } else if (errorResponse.request) {
                error = errorResponse.request
            } else {
                error = errorResponse
            }

            return { error }
        }
    }

    async post<Req, Res>(
        url: string, body: Req, headers?: { [key: string]: string }
    ) {
        return this.makeRequest<Req, Res>({ url, method: 'post', body, headers })
    }

    async get<Res>(
        url: string, headers?: { [key: string]: string }
    ) {
        return this.makeRequest<unknown, Res>({ url, method: 'get', headers })
    }

    async put<Req, Res>(
        url: string, body: Req, headers?: { [key: string]: string }
    ) {
        return this.makeRequest<Req, Res>({ url, method: 'put', body, headers })
    }

    async delete<Req, Res>(
        url: string, headers?: { [key: string]: string }
    ) {
        return this.makeRequest<Req, Res>({ url, method: 'delete', headers })
    }
}

const http = new Http()
export default http

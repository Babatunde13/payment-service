declare class Http {
    private makeRequest
    post<Req, Res>(url: string, body: Req, headers?: {
        [key: string]: string;
    }): Promise<{
        data: Res;
        error?: undefined;
    } | {
        error: any;
        data?: undefined;
    }>;
    get<Res>(url: string, headers?: {
        [key: string]: string;
    }): Promise<{
        data: Res;
        error?: undefined;
    } | {
        error: any;
        data?: undefined;
    }>;
    put<Req, Res>(url: string, body: Req, headers?: {
        [key: string]: string;
    }): Promise<{
        data: Res;
        error?: undefined;
    } | {
        error: any;
        data?: undefined;
    }>;
    delete<Req, Res>(url: string, headers?: {
        [key: string]: string;
    }): Promise<{
        data: Res;
        error?: undefined;
    } | {
        error: any;
        data?: undefined;
    }>;
}
declare const http: Http
export default http

export declare class BaseService {
    protected secretKey: string
    protected baseUrl: string
    constructor(secretKey: string, baseUrl: string);
    buildUrlWithQueryParam: (url: string, query: {
        [key: string]: any;
    }) => string
}
export declare type Any = any;
declare type Response<T> = {
    data: T;
    error?: undefined;
} | {
    data?: undefined;
    error: Any;
};
export declare type BaseResponse<T> = Promise<Response<T>>;
export {}

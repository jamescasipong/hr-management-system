

declare interface ApiResponse {
    status: number;
    message: string;
}

declare interface ApiResponse<T> extends ApiResponse {
    data: T;
}

declare interface AxiosResponseConfig {
    status: number;
    statusText: string;
    headers: any;
    config: any;
    request?: any;
    data?: any;
}

declare interface AxiosResponseConfig<T> extends AxiosResponseConfig {
    data: T;
}
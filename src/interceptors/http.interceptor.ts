import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { http } from "../services/http/http.service";
import { FunctionTypeStruct } from "../types/function.type";
import { LocalStorageUtil } from "../utils/local-storage.util";
import { ResponseDTO } from "../dto/response.dto";
import { AuthResponseDTO } from "../dto/auth-response.dto";

export class HttpInterceptor {
    
    constructor() {
        this.initializeInterceptor();
    }

    public initializeInterceptor(): void {

        http.interceptors.response.use(
            (error: AxiosError): Error => {
                switch(error.status) {
                }
            }
        );
    }
}
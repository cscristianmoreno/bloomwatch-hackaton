import { AxiosError, type AxiosResponse } from "axios";
import { http } from "../api/api.service";

export class HttpInterceptor {
    
    constructor(private onSetLoading: (loading: boolean) => void) {
        this.initializeInterceptor();
    }

    public initializeInterceptor(): void {

       http.interceptors.response.use(
            (response: AxiosResponse): AxiosResponse => {

                return response;
            },
            (error: AxiosError): void => {
                alert(error.response?.data);
                this.onSetLoading(false);
            }
        );
    }
}
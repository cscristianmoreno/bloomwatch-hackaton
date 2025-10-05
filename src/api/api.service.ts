import type { AxiosInstance } from "axios";
import axios from "axios";

const BASE_URL: string = "https://modis.ornl.gov/rst/api/v1";

export const http: AxiosInstance = axios.create({
    baseURL: BASE_URL,
});
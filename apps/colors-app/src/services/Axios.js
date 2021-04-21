import axios from 'axios';
import { Config } from 'Config';

export const http = axios.create({
    baseURL: Config.apiBaseUrl,
    timeout: Config.timeout,
});
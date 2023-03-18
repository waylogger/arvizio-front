import {
    IApiClient,
    ApiMethodsEnum,
    IUser,
    MediaType,
    FileTypeEnum,
} from './interface';
import { config } from './cfg';
import axios from 'axios';

export abstract class ApiClientAbstract {
    protected backend = config.url.backend;
    protected options() {
        return {
            withCredentials: true,
        };
    }
}

import { HttpHeaders }              from "@angular/common/http";
import { NayaApiErrorResponse } from "./naya-api-error-response";

export class NayaSessionErrorResponse extends NayaApiErrorResponse {
    
    sessionError: string = String.empty;

    constructor(init: {
        error?: any;
        headers?: HttpHeaders;
        status?: number;
        statusText?: string;
        url?: string;
    }) {
        super(init);
    }
}

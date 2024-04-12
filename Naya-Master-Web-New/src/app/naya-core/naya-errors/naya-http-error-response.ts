import { HttpErrorResponse, 
        HttpHeaders }               from "@angular/common/http";

export class NayaHttpErrorResponse extends HttpErrorResponse {
    
    public httpMethod: string = String.empty;

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

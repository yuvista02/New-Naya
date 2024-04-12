import { HttpHeaders }              from "@angular/common/http";
import { NayaApiErrorResponse }     from "@naya-core/naya-errors/naya-api-error-response";
import { ValidationProblemDetail }  from "@naya-core/naya-errors/problem-detail";

export class NayaApiValidationErrorResponse extends NayaApiErrorResponse {
    
    public validationProblemDetail!: ValidationProblemDetail;

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

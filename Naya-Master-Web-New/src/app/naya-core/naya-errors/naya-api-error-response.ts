import { HttpHeaders }              from "@angular/common/http";
import { NayaHttpErrorResponse }    from "@naya-core/naya-errors/naya-http-error-response";
import { ProblemDetail }            from "@naya-core/naya-errors/problem-detail";

export class NayaApiErrorResponse extends NayaHttpErrorResponse {
    
    public problemDetail!: ProblemDetail;

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

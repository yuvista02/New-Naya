import { NayaApiErrorResponse } from "@naya-core/naya-errors/naya-api-error-response";

export interface IApiResult {
    success: boolean;
    message: string;
    apiError: NayaApiErrorResponse | Promise<NayaApiErrorResponse>;
}

export class ApiResult implements IApiResult {
    success: boolean = false;
    message: string = String.empty;
    apiError!: NayaApiErrorResponse;
}

export class ApiContentResult<T> extends ApiResult {
    content!: T;
}

export class ApiBlobResult implements IApiResult {
    success: boolean = false;
    message: string = String.empty;
    apiError!: Promise<NayaApiErrorResponse>;
    content!: Blob;
    contentDisposition: string = String.empty;
}

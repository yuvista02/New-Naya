import { HttpClient }                               from "@angular/common/http";
import { Injectable }                               from "@angular/core";
// Third party imports
import { Observable, lastValueFrom, of }            from "rxjs";
import { catchError, map }                          from "rxjs/operators";
// MS Imports
import { NayaAppConfigService }                     from "./naya-app-config.service";
import { NayaApiErrorResponse }                     from "@naya-core/naya-errors/naya-api-error-response";
import { ApiBlobResult, ApiContentResult, 
         ApiResult }                                from "@naya-core/models/api-result";
import { ConstantString }                           from "@naya-shared/constants/constant-string";

@Injectable()
export class NayaApiClient {
    private readonly _apiUrl: string;

    constructor(
        private nayaConfig: NayaAppConfigService,
        private _http: HttpClient
    ) {
        this._apiUrl = this.nayaConfig.GetNayaConfig().apiUrl;
    }
    
    public getDomainUrl(controller: string): string {
        return `${ConstantString.Version1}/${controller}`;
    }

    public combineUrl(...paths: (string|number)[]): string {
        return paths.join('/');
    }
    
    public async getAsync<TResult>(
        endPoint: string
    ): Promise<ApiContentResult<TResult>> {
        
        const url = `${this._apiUrl}${endPoint}`;
        const get$ = this._http.get<TResult>(url)
        .pipe(
            map((response: TResult) => this.convertResponseToApiContentResult<TResult>(response)),
            catchError((apiError: NayaApiErrorResponse) => this.convertErrorToApiContentResult(apiError))
        );        
        const result: ApiContentResult<TResult> = await lastValueFrom(get$);
        return result;
    }
    
    public async postAsync<TBody>(
        endPoint: string,
        body: TBody
    ): Promise<ApiResult> {

        return this.postWithResultAsync<TBody, null>(endPoint, body);
    }

    public async postWithResultAsync<TBody, TResult>(
        endPoint: string,
        body: TBody
    ): Promise<ApiContentResult<TResult>> {
        
        const url = `${this._apiUrl}${endPoint}`;
        const post$ = this._http.post<TResult>(url, body)
        .pipe(
            map((response: TResult) => this.convertResponseToApiContentResult<TResult>(response)),
            catchError((apiError: NayaApiErrorResponse) => this.convertErrorToApiContentResult(apiError))
        );
        const result: ApiContentResult<TResult> = await lastValueFrom(post$);
        return result;
    }

    public async putAsync<TBody, TResult>(
        endPoint: string,
        body: TBody
    ): Promise<ApiResult> {
        const url = `${this._apiUrl}${endPoint}`;
        const put$ =  this._http.put<TResult>(url, body)
        .pipe(
            map((response: TResult) => this.convertResponseToApiContentResult<TResult>(response)),
            catchError((apiError: NayaApiErrorResponse) => this.convertErrorToApiResult(apiError))
        );
        const result: ApiResult = await lastValueFrom(put$);
        return result;
    }

    public async deleteAsync(
        endPoint: string
    ): Promise<ApiResult> {
        const url = `${this._apiUrl}${endPoint}`;
        const delete$ =  this._http.delete(url)
        .pipe(
            map(_ => {
                const apiResult = new ApiResult();
                apiResult.success = true;
                return apiResult;
            }),
            catchError((apiError: NayaApiErrorResponse) => this.convertErrorToApiResult(apiError))
        );
        const result: ApiResult = await lastValueFrom(delete$);
        return result;
    }

    public async getBlobWithPostAsync<TBody>(
        endPoint: string,
        body: TBody
    ): Promise<ApiBlobResult> {
        
        const url = `${this._apiUrl}${endPoint}`;
        const get$ = this._http.post(url, body, {
            responseType: 'blob',
            observe: 'response'
        })
        .pipe(
            map((response: any) => {
                const apiResult = new ApiBlobResult();
                apiResult.success = true;
                apiResult.content = new Blob([response.body]);
                apiResult.contentDisposition = response.headers.get('Content-Disposition');
                return apiResult;
            }
        ),
            catchError((apiError: Promise<NayaApiErrorResponse>) => this.convertErrorToApiBlobResult(apiError))
        );        
        const result: ApiBlobResult = await lastValueFrom(get$);
        return result;
    }

    public async getBlobAsync(
        endPoint: string
    ): Promise<ApiBlobResult> {
        
        const url = `${this._apiUrl}${endPoint}`;
        const get$ = this._http.get(url, {
            responseType: 'blob',
            observe: 'response'
        })
        .pipe(
            map((response: any) => {
                const apiResult = new ApiBlobResult();
                apiResult.success = true;
                apiResult.content = new Blob([response.body], { type: 'application/pdf' });
                apiResult.contentDisposition = response.headers.get('Content-Disposition');
                return apiResult;
            }
        ),
            catchError((apiError: Promise<NayaApiErrorResponse>) => this.convertErrorToApiBlobResult(apiError))
        );        
        const result: ApiBlobResult = await lastValueFrom(get$);
        return result;
    }

    // Private methods
    private convertErrorToApiResult(apiError: NayaApiErrorResponse): Observable<ApiResult> {
        const apiResult: ApiResult = new ApiResult();
        apiResult.apiError = apiError;
        return of(apiResult);
    }

    private convertErrorToApiContentResult(apiError: NayaApiErrorResponse): Observable<ApiContentResult<any>> {
        const apiResult = new ApiContentResult<any>();
        apiResult.apiError = apiError;
        return of(apiResult);
    }

    private convertErrorToApiBlobResult(apiError: Promise<NayaApiErrorResponse>): Observable<ApiBlobResult> {
        const apiResult = new ApiBlobResult();
        apiResult.apiError = apiError;
        return of(apiResult);
    }

    private convertResponseToApiContentResult<TResult>(response: TResult) {
        const apiResult = new ApiContentResult<TResult>();
        apiResult.success = true;
        apiResult.content = response;
        return apiResult;
    }    
}

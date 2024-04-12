import { Injectable }                               from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, 
        HttpInterceptor, 
        HttpRequest, HttpResponse }                 from "@angular/common/http";
import { Observable, throwError }                   from "rxjs";
import { catchError, finalize, tap }                from 'rxjs/operators';
// Naya Imports
import { NayaWebRequest }                           from "@naya-core/models/naya-web-request.model";
import { NayaApiErrorResponse }                     from "@naya-core/naya-errors/naya-api-error-response";
import { NayaHttpErrorResponse }                    from "@naya-core/naya-errors/naya-http-error-response";
import { NayaApiValidationErrorResponse }           from "@naya-core/naya-errors/naya-api-validation-error-response";
import { NayaSessionErrorResponse }                 from '@naya-core/naya-errors/naya-session-error-response';
import { ProblemDetail, ValidationProblemDetail }   from "@naya-core/naya-errors/problem-detail";
import { ProblemTitle }                             from "@naya-core/naya-errors/problem-title";
import { NayaApplicationInsight }                   from "@naya-core/services/naya-application-insight.service";

@Injectable()
export class NayaApiInterceptor implements HttpInterceptor {
  constructor(
    private _nayaApplicationInsight: NayaApplicationInsight
  ) { }

  intercept(httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const webRequest = new NayaWebRequest(httpRequest.method, httpRequest.urlWithParams);

    // extend server response observable with logging
    return next.handle(httpRequest)
      .pipe(
        tap({
          // Succeeds when there is a response; ignore other events
          next: (httpEvent) => (this.setResponse(httpEvent, webRequest)),
          // Operation failed; error is an HttpErrorResponse
          error: (error: HttpErrorResponse) => (this.setError(error, webRequest))
        }),
        catchError((error: HttpErrorResponse) => {
          return this.transformError(error, httpRequest);
        }),
        // Log when response observable either completes or errors
        finalize(() => {
          this._nayaApplicationInsight.logWebRequest(webRequest);
        })
      );
  }

  private setResponse(response: HttpEvent<any>, webRequest: NayaWebRequest) {
    if (response instanceof HttpResponse) {
      webRequest.httpStatus = response.status;
      if ([200, 201, 204].includes(response.status)) {
        webRequest.setSuccess();
      }
      else {
        webRequest.setFailure();
        webRequest.message = response.body;
      }
    }
  }

  private setError(error: HttpErrorResponse, webRequest: NayaWebRequest) {

    webRequest.setFailure();
    webRequest.httpStatus = error.status;
    webRequest.message = error.message;
    webRequest.httpError = error.error;

    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('NayaApiInterceptor: Error', error.error);

    } else {

      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`NayaApiInterceptor: Backend returned code ${error.status}, body was: `, error.error);
    }
  }

  /**
   * Transorm respose from Nayastope api to typed error response
   *
   * @param error - error from api call that failed
   * @param httpRequest - httpRequest for api call
   */
  private transformError(error: HttpErrorResponse, httpRequest: HttpRequest<any>): Observable<never> {

    if (httpRequest.responseType === "blob") {
      const blobError = this.transformBlobError(error, httpRequest);
      return throwError(() => blobError);
    }
    // The [ApiController] attribute makes model validation errors automatically trigger an HTTP 400 response.
    // https://learn.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-2.2#automatic-http-400-responses
    if (error.status === 400) {

      if (this.isValidationProblemDetail(error.error)) {

        const validationProblemDetail: ValidationProblemDetail = error.error as ValidationProblemDetail;
        const apiValidationError = this.createValidationError(error, httpRequest, validationProblemDetail);
        return throwError(() => apiValidationError);
      }
    }
    else if (error.status === 422) {
      if (this.isProblemDetail(error.error)) {

        const problemDetail: ProblemDetail = error.error as ProblemDetail;

        if (problemDetail.title === ProblemTitle.UserSessionError) {
          const apiError = this.createSessionError(error, httpRequest, problemDetail);
          return throwError(() => apiError);
        }
        else {
          const apiError = this.createApiError(error, httpRequest, problemDetail);
          return throwError(() => apiError);
        }
      }
    }

    // Default to NayaHttpErrorResponse
    const httpError = this.createHttpError(error, httpRequest);
    return throwError(() => httpError);
  }

  private createHttpError(error: HttpErrorResponse, httpRequest: HttpRequest<any>) {
    const httpError = new NayaHttpErrorResponse({
      error: error.error,
      headers: error.headers,
      status: error.status,
      statusText: error.statusText,
      url: error.url ?? String.empty
    });
    httpError.httpMethod = httpRequest.method;
    return httpError;
  }

  private createValidationError(error: HttpErrorResponse, httpRequest: HttpRequest<any>, validationProblemDetail: ValidationProblemDetail) {
    const apiError = new NayaApiValidationErrorResponse({
      error: error.error,
      headers: error.headers,
      status: error.status,
      statusText: error.statusText,
      url: error.url ?? String.empty
    });
    apiError.httpMethod = httpRequest.method;
    apiError.validationProblemDetail = validationProblemDetail;
    return apiError;
  }

  private createApiError(error: HttpErrorResponse, httpRequest: HttpRequest<any>, problemDetail: ProblemDetail) {
    const apiError = new NayaApiErrorResponse({
      error: error.error,
      headers: error.headers,
      status: error.status,
      statusText: error.statusText,
      url: error.url ?? String.empty
    });
    apiError.httpMethod = httpRequest.method;
    apiError.problemDetail = problemDetail;
    return apiError;
  }

  private createSessionError(error: HttpErrorResponse, httpRequest: HttpRequest<any>, problemDetail: ProblemDetail
  ): NayaSessionErrorResponse {

    const apiError = new NayaSessionErrorResponse({
      error: error.error,
      headers: error.headers,
      status: error.status,
      statusText: error.statusText,
      url: error.url ?? String.empty
    });
    apiError.httpMethod = httpRequest.method;
    apiError.problemDetail = problemDetail;
    return apiError;
  }

  private isProblemDetail(error: any): error is ProblemDetail {
    return (error as ProblemDetail).title !== undefined;
  }

  private isValidationProblemDetail(error: any): error is ValidationProblemDetail {
    return (error as ValidationProblemDetail).errors !== undefined;
  }

  private async transformBlobError(error: HttpErrorResponse, httpRequest: HttpRequest<any>): Promise<HttpErrorResponse> {
    return this.readBlobAsString(error.error)
      .then((errmsg) => {
        let actualError = this.parseErrorMessage(errmsg);

        if (this.isProblemDetail(actualError)) {
          if (actualError.title === ProblemTitle.UserSessionError) {
            return this.createSessionError(error, httpRequest, actualError);
          }
          else if (this.isValidationProblemDetail(actualError)) {
            return this.createValidationError(error, httpRequest, actualError);
          }
          return this.createApiError(error, httpRequest, actualError);
        }
        return this.createHttpError(error, httpRequest);
      });
  }

  private readBlobAsString(blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("An error occurred while reading the server response."));
      reader.readAsText(blob);
    });
  }

  private parseErrorMessage(errorMsg: string): string | object {
    let errorMessage = errorMsg;
    try {
      return JSON.parse(errorMsg);
    } catch (e) {
      // do nothing and use the original error message
    }
    return errorMessage;
  }
}
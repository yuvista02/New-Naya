import { Injectable }                                             from '@angular/core';
import { FormGroup }                                              from '@angular/forms';
import { Router }                                                 from '@angular/router';
// 
import { ApiBlobResult, IApiResult }                              from '@naya-core/models/api-result';
import { NayaApiErrorResponse }                                   from '@naya-core/naya-errors/naya-api-error-response';
import { NayaApiValidationErrorResponse }                         from '@naya-core/naya-errors/naya-api-validation-error-response';
import { ValidationProblemDetail, ValidationProblemDetailError }  from '@naya-core/naya-errors/problem-detail';
import { FileSaverService }                                       from '@naya-core/services/naya-file-saver.service';
import { UserConnectionService }                                     from '@naya-core/services/user-session.service';
import { DefaultValues }                                          from '@naya-shared/constants/default-values';
import { MessageSeverity }                                        from '@naya-shared/constants/message-severity';
import { NayaDialogService }                                      from '@naya-shared/services/naya-dialog.service';
import { NayaMessageService }                                     from '@naya-shared/services/naya-message.service';

type NayaErrorDetail = {
  title: string;
  errorMessage: string;
  validationMessages: string[];
};

@Injectable({
  providedIn: 'root'
})
export class ComponentUtilityService {
  private readonly separator: string = DefaultValues.Separator;

  constructor(
    private _userSessionService: UserConnectionService,
    private _nayaMessageService: NayaMessageService,
    private _nayaDialogService: NayaDialogService,
    private _router: Router,
    private _fileSaverService: FileSaverService
  ) { }

  public IsFormValid(formGroup: FormGroup): boolean {
    if (!formGroup.valid) {
      this._nayaMessageService.showToastMessage(MessageSeverity.Error, "Please complete all fields as indicated.");
    }
    return formGroup.valid;
  }

  public WasSuccessful(apiResult: IApiResult): boolean {

    if (!apiResult.success) {
      this.showNayaApiErrorMessage(apiResult);
    }
    return apiResult.success;
  }

  public WasSuccessfulWithErrorDialog(apiResult: IApiResult): boolean {

    if (!apiResult.success) {
      this.showNayaApiErrorDialog(apiResult);
    }
    return apiResult.success;
  }


  public WasSubmitSuccessful(apiResult: IApiResult, formGroup: FormGroup): boolean {

    if (!apiResult.success) {
      this.handleApiErrors(apiResult, formGroup);
    }
    return apiResult.success;
  }

  public WasDownloadSuccessful(apiBlobResult: ApiBlobResult) {
    if (!apiBlobResult.success) {
      this.showNayaApiErrorMessage(apiBlobResult);
    }
    this._fileSaverService.SaveFile(apiBlobResult.content, apiBlobResult.contentDisposition);
    return apiBlobResult.success;
  }
  private async showNayaApiErrorMessage(apiResult: IApiResult,) {
    const apiError: NayaApiErrorResponse = await this.resolvePromiseAndGetApiError(apiResult);
    const errorDetail: NayaErrorDetail = this.getErrorDetail(apiError)
    
    const message = `${errorDetail.title}${this.separator}` +
      `${errorDetail.errorMessage}${this.separator}` +
      `${errorDetail.validationMessages.join(this.separator)}${this.separator}` +
      `${this._userSessionService.getDisplayString()}${this.separator}` +
      `${apiError.httpMethod}: ${apiError.url} (${apiError.status})${this.separator}` +
      `Page: ${this._router.url}`;

    this._nayaMessageService.showMessages(MessageSeverity.Warn, message);

  }

  private async showNayaApiErrorDialog(apiResult: IApiResult,) {
    const apiError: NayaApiErrorResponse = await this.resolvePromiseAndGetApiError(apiResult);
    const errorDetail: NayaErrorDetail = this.getErrorDetail(apiError)

    const header: string = errorDetail.title;

    const message: string = `${errorDetail.errorMessage}${this.separator}` +
      `${errorDetail.validationMessages.join(this.separator)}${this.separator}`;

    const footer: string = `${this._userSessionService.getDisplayString()}${this.separator}` +
      `${apiError.httpMethod}: ${apiError.url} (${apiError.status})${this.separator}` +
      `Page: ${this._router.url}`;

    this._nayaDialogService.DoDisplayDialog(header, message, footer, false, false);
  }

  public WasBatchSuccessfulWithErrorDialog(apiResults: IApiResult[]): boolean {
    const failedResults: IApiResult[] = [];

    for (const apiResult of apiResults) {
      if (!apiResult.success) {
        failedResults.push(apiResult);
      }
    }

    if (failedResults.length > 0) {
      this.showBatchApiErrorDialog(failedResults, apiResults.length);
    }

    return failedResults.length === 0;
  }

  private async showBatchApiErrorDialog(failedResults: IApiResult[], totlaResult: number) {
    const header: string = `Batch Errors (${failedResults.length} failed out of ${totlaResult})`;

    const messages: string[] = [];
    for (const apiResult of failedResults) {
      const apiError: NayaApiErrorResponse = await this.resolvePromiseAndGetApiError(apiResult);
      const errorDetail: NayaErrorDetail = this.getErrorDetail(apiError);
      messages.push(
        `${apiError.httpMethod}: ${apiError.url} (${apiError.status})${this.separator}` +
        `${errorDetail.errorMessage}${this.separator}${errorDetail.validationMessages.join(this.separator)}${this.separator}`
      );
    }

    const footer: string = `${this._userSessionService.getDisplayString()}${this.separator}` +
      `Page: ${this._router.url}`;

    this._nayaDialogService.DoDisplayDialog(header, messages.join('\n'), footer, false, false);
  }

  private async resolvePromiseAndGetApiError(apiResult: IApiResult) {
    let apiError: NayaApiErrorResponse;
    if (apiResult.apiError instanceof Promise) {
      apiError = await apiResult.apiError;
    }
    else {
      apiError = apiResult.apiError;
    }
    return apiError;
  }

  private getErrorDetail(apiError: NayaApiErrorResponse): NayaErrorDetail {

    const errorMessage: string = apiError.problemDetail?.detail ?? apiError.message;
    let title = apiError.problemDetail?.title ?? "Client Error";
    let validationMessages: string[] = [];

    if (apiError instanceof NayaApiValidationErrorResponse) {
      const errorResponse: NayaApiValidationErrorResponse = apiError;
      const validationProblemDetail: ValidationProblemDetail = errorResponse.validationProblemDetail;
      const validationErrors: ValidationProblemDetailError = validationProblemDetail.errors;

      title = validationProblemDetail.title;

      Object.entries(validationErrors).forEach((errorList: [string, string[]]) => {
        const message = errorList[1].join(this.separator);
        const controlName = this.getFormattedControlName(errorList[0]);
        validationMessages.push(`${controlName}: ${message}`)
      });
    }

    return { title, errorMessage, validationMessages };
  }

  private handleApiErrors(apiResult: IApiResult, formGroup: FormGroup) {
    if (apiResult.apiError instanceof NayaApiValidationErrorResponse) {
      const errorResponse: NayaApiValidationErrorResponse = apiResult.apiError;
      const validationProblemDetail: ValidationProblemDetail = errorResponse.validationProblemDetail;
      const validationErrors: ValidationProblemDetailError = validationProblemDetail.errors;
      const separator = '\r\n';

      Object.entries(validationErrors).forEach((errorList: [key: string, value: string[]]) => {
        const message = errorList[1].join(separator);
        const controlName = this.getFormattedControlName(errorList[0]);
        const control = formGroup.controls[controlName];
        if (control) {
          control.setErrors({
            serverError: this.getFormattedMessage(errorList[0], message)
          });
          control.markAsDirty();
        }
      });
    }
    else {
      this.showNayaApiErrorMessage(apiResult);
    }
  }

  private getFormattedControlName(name: string): string {
    if (!(name?.length)) {
      return name;
    }

    if (name.substring(0, 2) === '$.') {
      name = name.substring(2, name.length);
    }

    return name.substr(0, 1).toLocaleLowerCase() + name.substr(1);
  }

  private getFormattedMessage(key: string, message: string): string {
    if (key.substring(0, 2) === '$.') {
      return 'Invalid Value.';
    } else {
      if (Array.isArray(message)) {
        message = message.join();
      }
      return message;
    }
  }
}

import { HttpErrorResponse, HttpStatusCode }    from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone }     from '@angular/core';
import { NavigationError, Router }              from '@angular/router';
// Naya Imports
import { NayaFormNotModifiedError }             from '@naya-core/naya-errors/naya-form-not-modified.error';
import { NayaHttpErrorResponse }                from '@naya-core/naya-errors/naya-http-error-response';
import { NayaSessionErrorResponse }             from '@naya-core/naya-errors/naya-session-error-response';
import { NayaApplicationInsight }               from '@naya-core/services/naya-application-insight.service';
import { UserConnectionService }                   from '@naya-core/services/user-session.service';
import { DefaultValues }                        from '@naya-shared/constants/default-values';
import { MessageSeverity }                      from '@naya-shared/constants/message-severity';
import { RoutePath }                            from '@naya-shared/constants/route-path';
import { NayaMessageService }                   from '@naya-shared/services/naya-message.service';
import { environment }                          from 'src/environments/environment';

@Injectable()
export class NayaErrorHandler implements ErrorHandler {

    constructor(
        private _ngZone: NgZone,
        private _nayaApplicationInsight: NayaApplicationInsight,
        private _nayaMessageService: NayaMessageService,
        private _userSessionService: UserConnectionService,
        private _router: Router
    ) { }
    
    private get _isConnectedToDatabase(): boolean {
        return this._userSessionService ? this._userSessionService.IsConnectedToDatabase() : false;
    }

    private get _enableErrorLogging(): boolean {
        return environment.production;
    }

    public HandleRouteError(error: NavigationError) : void {
        this.logToConsole('Navigation Error from global error handler', error);
        this._router.navigate([RoutePath.Error], { skipLocationChange: true });
    }

    handleError(error: Error | HttpErrorResponse) {
        this.logToConsole('Error from global error handler', error);

        if (this._enableErrorLogging) {
            this._nayaApplicationInsight.logException(error);
        }

        if (error instanceof NayaSessionErrorResponse) {
            this.handleSessionError(error);
        } else if (error instanceof NayaHttpErrorResponse) {
            this.handleNayaHttpError(error);
        } else if (error instanceof NayaFormNotModifiedError) {
            this.handleFormNotModifiedError(error);
        } else {
            this.handleClientError(error);
        }
    }

    private handleFormNotModifiedError(error: NayaFormNotModifiedError) {
        this.logToConsole(error);
        this._nayaMessageService.showToastMessage(MessageSeverity.Info, error.message);
    }

    private handleClientError(error: Error) {

        let errorMessage = 'Something went wrong. Please contact Naya Software.';

        const separator = DefaultValues.Separator;        
        const sessionMessage: string = this._userSessionService.getDisplayString();
        const summary = `${separator}Error: ${error.message}${separator}${sessionMessage}` +
        `Page: ${this._router.url}`;

        if (!this._isConnectedToDatabase) {
            errorMessage = 'Detail: ' + error.stack;
            this.logToConsole(error);
        }
        const completeMessage = `${errorMessage}${separator}${summary}${separator}{Client Error}`
        this._nayaMessageService.showMessages(MessageSeverity.Error, completeMessage);
    }

    private handleSessionError(sessionError: NayaSessionErrorResponse) {
        this.logToConsole(sessionError);

        alert("Invalid Naya session. Please login again.");

        this._nayaApplicationInsight.logEvent("NayaErrorHander: Invalid Session Issue. Routing to Login Page.");
        this._ngZone.run(() => this._router.navigate([RoutePath.Login], { state: { bypassUnsavedChangeGuard: true } })).then();
    }

    private handleNayaHttpError(nayaHttpError: NayaHttpErrorResponse): void {
        
        const separator = DefaultValues.Separator;
        const errorMessage: string = nayaHttpError.message;
        const severity: string = this.getMessageSeverity(+nayaHttpError.status);
        const message =
            `${nayaHttpError.name}${separator}` +
            `${errorMessage}${separator}` +
            //`${this.validationMessages.join(separator)}${separator}` +
            `${this._userSessionService.getDisplayString()}${separator}` +
            `${nayaHttpError.httpMethod}: ${nayaHttpError.url} (${nayaHttpError.status})${separator}` +
            `Page: ${this._router.url}`;

        this._nayaMessageService.showMessages(severity, message);
    }

    private getMessageSeverity(status: number) {
        let warningErrorCodes: HttpStatusCode[] = [HttpStatusCode.Unauthorized, HttpStatusCode.UnprocessableEntity];
        return warningErrorCodes.includes(status) ? MessageSeverity.Warn : MessageSeverity.Error;
    }

    private logToConsole(message: any, ...content: any) {
        return console.log(message, content);
    }
}

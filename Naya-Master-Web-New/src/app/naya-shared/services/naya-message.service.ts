import { Injectable }                       from "@angular/core";
import { Router, NavigationEnd }            from "@angular/router";

// Third party imports
import { Message, MessageService }          from "primeng/api";
import { BehaviorSubject, Observable }      from "rxjs";
import { filter, map }                      from "rxjs/operators";
// Naya Imports
import { MessageSeverity }                  from "@naya-shared/constants/message-severity";
import { RoutePath }                        from "@naya-shared/constants/route-path";

@Injectable()
export class NayaMessageService {
    
    private _messages$ = new BehaviorSubject<Message[]>([]);
    
    constructor(
        private messageService: MessageService,
        private router: Router
    ) {
        this.doSetClearMessage();
    }

    public GetMessages(): Observable<Message[]> {
        return this._messages$.asObservable();
    }

    // servirities
    // 1. info
    // 2. warn
    // 3. error
    // 4. success

    private doSetClearMessage() {
        this.router.events
            .pipe(
                filter((e) => e instanceof NavigationEnd),
                map(e => e as NavigationEnd)
            )
            .subscribe(
                (e: NavigationEnd) => {
                    // Do not clear the message if the error is redirecting to login page.
                    if (this.isRedirectToLogin(e)) {
                        return;
                    }
                    this.doClearMessages();
                }
            );
    }

    public doClearMessages() {
        this._messages$.next([]);
    }

    public toastSuccess(message: string) {        
      this.showToastMessage(MessageSeverity.Success, message);
    }

    public toastInfo(message: string) {        
      this.showToastMessage(MessageSeverity.Info, message);
    }
  
    public showToastMessage(
        severity: string,
        detail: string,
        summary: string = ''
    ) {
        this.doClearMessages();

        summary = summary || this.getDefaultSummary(severity);

        this.messageService.add({
            key: "tst",
            severity: severity,
            summary: summary,
            detail: detail,
        });
    }

    public showMatterNotificationToastMessage(
        severity: string,
        detail: string,
        summary: string = ''
    ) {
        this.doClearMessages();

        summary = summary || this.getDefaultSummary(severity);

        this.messageService.add({
            key: "matterNotification",
            severity: severity,
            summary: summary,
            detail: detail,
            sticky: true
        });
    }
    
    private isRedirectToLogin(e: NavigationEnd) {
        if (e?.urlAfterRedirects) {
            return e.urlAfterRedirects.includes(RoutePath.Login);
        } else {
            return false;
        }
    }

    private getDefaultSummary(severity: string){
        return severity.toTitleCase() + " Message";
    }

    public showMessages(
        severity: string,
        detail: string,
        summary: string = ''
    ) {
        this._messages$.next([
            {
                severity: severity,
                summary: summary,
                detail: detail,
            }
        ])
    }
}

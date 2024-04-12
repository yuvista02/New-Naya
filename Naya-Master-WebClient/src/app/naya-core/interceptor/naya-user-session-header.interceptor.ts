import { Injectable } from "@angular/core";
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
}                                 from "@angular/common/http";
import { Observable } from "rxjs";
import { UserConnectionService }  from "@naya-core/services/user-session.service";

@Injectable()
export class NayaUserSessionHeaderInterceptor implements HttpInterceptor {
    constructor(private _userSessionService: UserConnectionService) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        const nayaUserSessionHeader = this._userSessionService.GetNayaUserSessionHeader();

        const updatedReq: HttpRequest<any> = nayaUserSessionHeader ? req.clone({ setHeaders: { nayauserconnection: nayaUserSessionHeader } }) : req;

        return next.handle(updatedReq);
    }
}

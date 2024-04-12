import { inject } from "@angular/core";
import { AppRouter } from "../../app.router";
import { UserConnectionService } from "../services/user-session.service";

export const UserSessionGuard = (): boolean =>  {
    
    const _appRouter = inject(AppRouter);
    const _userSessionService = inject(UserConnectionService);

    const isNayaSessionActive = _userSessionService.IsConnectedToDatabase();

    if (isNayaSessionActive) {
        return true;
    }
    else{
        _appRouter.RouteToLogin();
        return false;
    }
}

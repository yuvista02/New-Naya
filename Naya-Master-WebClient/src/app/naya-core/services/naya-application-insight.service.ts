import { Injectable }           from '@angular/core';
import { ApplicationInsights }  from '@microsoft/applicationinsights-web';
// MS Imports
import { environment }          from 'src/environments/environment';
import { NayaApp }              from 'src/naya-config/naya-app';
import { NayaAppState }         from '@app/naya-app-state';
import { NayaWebRequest }       from '@naya-core/models/naya-web-request.model';
import { NayaTrace }            from '@naya-core/models/naya-trace.model';

@Injectable()
export class NayaApplicationInsight {
    private readonly _id: string;
    private _appInsights!: ApplicationInsights;
    private _connectionName: string = String.empty;
    private _nayaUserName: string = String.empty;
    private _userSessionID: string = String.empty;
    private _azureUserName: string = String.empty;

    constructor(private _nayaAppState: NayaAppState) {
        this._id = String.currentTimeStamp();
        this._nayaAppState.setAppInsightsId(this._id);
    }

    public Initialize(instrumentationKey: string): void {

        this._appInsights = new ApplicationInsights({
            config: {
                instrumentationKey: instrumentationKey,
                enableAutoRouteTracking: true, // option to log all route changes
                disableTelemetry: !this._enableTelemetry,
                disableAjaxTracking: true,
            },
        });
        if (this._enableTelemetry) {
            this._appInsights.loadAppInsights();
            // Time Stamp in UTC.

            this._appInsights.context.application.ver = NayaApp.ApplicationVersion;
            this._appInsights.context.user.id = this._id;
            this._appInsights.context.session.id = this._id;

            this.logEvent("Application Insight: Initialized!");
        }
    }

    private get _enableTelemetry(): boolean {
        return environment.production;
    }

    public SetAzureUserName(azureUserName: string) {
        this._azureUserName = azureUserName;

        if (this._appInsights?.context) {
            this._appInsights.context.user.authenticatedId = azureUserName;
        }
    }

    public MSSetNayaUserDetail(preferredUserName: string, userSessionID: number) {
        this._nayaUserName = preferredUserName;
        this._userSessionID = userSessionID?.toString();

        if (this._appInsights?.context) {
            this._appInsights.context.session.id = this._userSessionID;
            this._appInsights.context.user.accountId = this._nayaUserName;
        }
    }

    public MSInitialize() {
        this._connectionName = "";
        this._nayaUserName = "";
        this._userSessionID = "";

        if (this._appInsights?.context) {
            this._appInsights.context.session.id = this._id;
            this._appInsights.context.user.accountId = "";
        }
    }

    public logPageView(name?: string, url?: string): void {
        if (!this._enableTelemetry)
            return;
        // option to call manually
        this._appInsights.trackPageView({
            name: name ?? String.empty,
            uri: url ?? String.empty,
        });
    }

    public logEvent(name: string, properties?: { [key: string]: any }): void {
        console.log(name);
        if (!this._enableTelemetry)
            return;

        if (properties === null) {
            properties = this.getCustomProperties();
        }
        name = `${this._id} - ${name}; ${this.getTelemetryPropertyString()}`;

        this._appInsights.trackEvent({ name: name }, properties);
    }

    public logMetric(
        name: string,
        average: number,
        properties?: { [key: string]: any }
    ): void {
        if (!this._enableTelemetry)
            return;
        if (properties === null) {
            properties = this.getCustomProperties();
        }
        this._appInsights.trackMetric({ name: name, average: average }, properties);
    }

    public logException(exception: Error, severityLevel?: number): void {
        console.error(exception);

        if (!this._enableTelemetry)
            return;

        const customProperties: { [key: string]: string } = this.getCustomProperties();

        this._appInsights.trackException({ exception: exception, severityLevel: severityLevel ?? 0 }, customProperties
        );
    }

    public logTrace(nayaTrace: NayaTrace): void {
        nayaTrace.stopTimer();
        console.info(nayaTrace);

        if (!this._enableTelemetry)
            return;

        const properties: { [key: string]: string } = this.getCustomProperties();
        properties["ClassName"] = nayaTrace.className;
        properties["MethodName"] = nayaTrace.methodName;
        properties["DurationMs"] = nayaTrace.durationMs.toString();

        if (nayaTrace.entityType) {
            properties["EntityType"] = nayaTrace.entityType;
        }
        if (nayaTrace.entityID) {
            properties["EntityID"] = nayaTrace.entityID;
        }

        const traceMessage: string = `${this._id} - ${nayaTrace.getLogMessage()}; ${this.getTelemetryPropertyString()}`;

        this._appInsights.trackTrace({ message: traceMessage }, properties);
    }

    public logWebRequest(nayaWebRequest: NayaWebRequest): void {
        nayaWebRequest.stopTimer();
        console.info(nayaWebRequest);

        if (!this._enableTelemetry)
            return;


        const properties: { [key: string]: string } = this.getCustomProperties();
        properties["MethodName"] = nayaWebRequest.methodName;
        properties["UrlWithParams"] = nayaWebRequest.urlWithParams;
        properties["DurationMs"] = nayaWebRequest.durationMs.toString();

        const traceMessage: string = `[Http] ${nayaWebRequest.getLogMessage()}; ${this.getTelemetryPropertyString()}`;

        this._appInsights.trackTrace({ message: traceMessage }, properties);
    }

    private getTelemetryPropertyString(): string {
        let returnString = "";
        if (this._azureUserName) {
            returnString += `${this._azureUserName}`;
        }

        if (this._userSessionID) {
            returnString += `; NayaConnectionID: ${this._userSessionID}`;
        }

        if (this._connectionName) {
            returnString += `; ${this._connectionName}`;
        }

        return returnString;
    }

    private getCustomProperties() {
        let returnProperties: { [key: string]: string } = {};

        const properties: { [key: string]: string } = {
            AzureUserName: this._azureUserName,
            ConnectionName: this._connectionName,
            UserConnectionID: this._userSessionID,
            NayaUserName: this._nayaUserName,
            ApplicationVersion: NayaApp.ApplicationVersion,
            ApplicationName: NayaApp.ApplicationName
        };

        for (let key in properties) {
            if (properties[key]) {
                returnProperties[key] = properties[key] ?? String.empty;
            }
        }

        return returnProperties;
    }
}

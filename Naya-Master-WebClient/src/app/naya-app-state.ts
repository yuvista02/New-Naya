export class NayaAppState {
    id: string;
    appComponentId: string = String.empty;
    appComponentIdCount: number = 0;
    msalWrapperId: string = String.empty;
    msalWrapperIdCount: number = 0;
    appInsightsId: string = String.empty;
    appInsightsIdCount: number = 0;

    constructor(){
        this.id = String.currentTimeStamp();
    }

    public setAppComponentId(id: string): void {
        if (this.appComponentId !== id) {
            this.appComponentId = id;
            this.appComponentIdCount++;
        }
    }

    public setMsalWrapperId(id: string): void {
        if (this.msalWrapperId !== id) {
            this.msalWrapperId = id;
            this.msalWrapperIdCount++;
        }
    }

    public setAppInsightsId(id: string): void {
        if (this.appInsightsId !== id) {
            this.appInsightsId = id;
            this.appInsightsIdCount++;
        }
    }
}

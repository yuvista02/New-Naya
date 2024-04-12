export class NayaWebRequest {
    public methodName: string;
    public urlWithParams: string;
    public message: string = String.empty;
    public status: string = String.empty;
    public httpStatus: number = 0;
    public httpError: any;
    private _start: number;
    public durationMs: number = 0;

    constructor(method: string, urlWithParams: string) {
        this.methodName = method;
        this.urlWithParams = urlWithParams;
        this._start = performance.now();
    }

    setSuccess(): void {
        this.status = "Success";
    }
    setFailure(): void {
        this.status = "Failure";
    }
    stopTimer(): void {
        this.durationMs = performance.now() - this._start;
    }    
    getLogMessage(): string {
        return `${this.status} ${this.methodName}:${this.urlWithParams} ${this.message}`;
    }
}
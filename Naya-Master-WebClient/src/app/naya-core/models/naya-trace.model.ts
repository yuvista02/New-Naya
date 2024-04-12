export class NayaTrace {
    public className: string;
    public methodName: string;
    public entityType: string = String.empty;
    public entityID: string = String.empty;
    public message: string = String.empty;
    public status: string = String.empty;
    private _start: number;
    public durationMs: number = 0;

    constructor(classNameValue: string, methodNameValue: string) {
        this.className = classNameValue;
        this.methodName = methodNameValue;
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
        return `${this.status} ${this.className}.${this.methodName}: ${this.message}`;
    }
}
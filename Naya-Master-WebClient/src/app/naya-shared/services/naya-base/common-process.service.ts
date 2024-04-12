import { ProcessStatus }            from "@naya-shared/constants/process-status";
import { NayaDialogService }        from "@naya-shared/services/naya-dialog.service";
import { NayaProcessErrors }        from '@naya-shared/models/naya-process.model';

export class NayaProcessBaseService {

    protected ProcessName: string = "";
    public ProcessMessage: string = "";
    public DisplayProgressBar: boolean = false;

    constructor(
        protected _nayaDialogService: NayaDialogService
    ) { }

    protected SetProcessName(name: string) {
        this.ProcessName = name;
    }

    protected MarkProcessInProgress(message: string | null) {
        this.setProcessStatus(ProcessStatus.InProgress, message, null, false);
    }

    protected MarkProcessComplete(message: string = String.empty) {
        this.setProcessStatus(ProcessStatus.Complete, message, null, false);
    }

    protected MarkProcessNotComplete(message: string, errorMessageList: NayaProcessErrors, displayLogMessages: boolean) {
        this.setProcessStatus(ProcessStatus.NotComplete, message, errorMessageList, displayLogMessages);
    }

    protected MarkProcessError(message: string, errorMessageList: NayaProcessErrors, displayLogMessages: boolean) {
        this.setProcessStatus(ProcessStatus.Error, message,  errorMessageList, displayLogMessages);
    }

    protected DisplayLogMessages(errorMessageList?: NayaProcessErrors) {
        this.displayLogMessages(null, errorMessageList);
    }

    private setProcessStatus(status: string, message: string | null, errorMessageList: NayaProcessErrors | null, displayLogMessages: boolean = false) {
        this.displayProcessMessage(status, message);
        if (displayLogMessages && errorMessageList) {
            this.displayLogMessages(status, errorMessageList);
        }
    }

    private displayLogMessages(status: string | null, errorMessageList?: NayaProcessErrors) {
        const dialogHeader = `${this.ProcessName} ` + (status ? `(${status})` : '');
        const dialogMessage = errorMessageList?.dialogErrorLists.map(a => a.message).join(". \n") ?? "";
        
        this._nayaDialogService.DoDisplayDialog(dialogHeader, dialogMessage);
    }

    private displayProcessMessage(status: string, message: string | null) {
        this.DisplayProgressBar = (status === ProcessStatus.InProgress);
        this.ProcessMessage = `${this.ProcessName} : ${status} ` + (message ? `- ${message}` : '');
    }

    protected HideProcessMessage() {
        this.DisplayProgressBar = false;
    }

}

import { Injectable } from '@angular/core';
// Naya Imports
import { FieldValues } from '@app/naya-shared/constants/field-values';


@Injectable({providedIn: 'root'})
export class NayaDialogService {

    private dialogSetting: DialogSetting = new DialogSetting();

    public DisplayDialog = false;
    public DisplaySideBar = false;

    constructor() { }

    public DoDisplayDialog(header: string, message: string, 
        footer: string = String.empty,
        displayRejectButton: boolean = false,
        displayConfirmButton: boolean = true,
        confirmButtonLabel: string = FieldValues.Close,
        rejectButtonLabel: string = FieldValues.Cancel) {

        this.initializeDialogSetting(header, message, footer,
                displayRejectButton, displayConfirmButton, confirmButtonLabel, rejectButtonLabel);

        this.DisplayDialog = true;
    }

    public DoDisplaySideBar(header: string, message: string, 
        footer: string = String.empty,
        displayRejectButton: boolean = false,
        displayConfirmButton: boolean = true,
        confirmButtonLabel: string = FieldValues.Okay,
        rejectButtonLabel: string = FieldValues.Cancel) {

        this.initializeDialogSetting(header, message, footer,
                displayRejectButton, displayConfirmButton, confirmButtonLabel, rejectButtonLabel);

        this.DisplaySideBar = true;
    }

    private initializeDialogSetting(
        Header: string, 
        Message: string,
        Footer: string,
        DisplayRejectButton: boolean,
        DisplayConfirmButton: boolean,
        ConfirmButtonLabel: string,
        RejectButtonLabel: string) {

            this.dialogSetting = new DialogSetting();
            this.dialogSetting.Header = Header;
            this.dialogSetting.Message = Message;
            this.dialogSetting.Footer = Footer;

            this.dialogSetting.DisplayRejectButton = DisplayRejectButton;
            this.dialogSetting.DisplayConfirmButton = DisplayConfirmButton;
            this.dialogSetting.ConfirmButtonLabel = ConfirmButtonLabel;
            this.dialogSetting.RejectButtonLabel = RejectButtonLabel;

    }
    public OnRejectClick(): void  {
        this.hideDialog();
    }

    private hideDialog(): void {
        this.DisplayDialog = false;
        this.DisplaySideBar = false;
        this.dialogSetting = new DialogSetting();
    }

    public get DialogSetting(): DialogSetting {
        return this.dialogSetting;
    }
}

export class DialogSetting {
    public Header: string = 'Confirmation';
    public Message: string = String.empty;
    public Footer: string = String.empty;
    public DisplayRejectButton: boolean = false;
    public DisplayConfirmButton: boolean = false;
    public ConfirmButtonLabel: string = "";
    public RejectButtonLabel: string = "";
}

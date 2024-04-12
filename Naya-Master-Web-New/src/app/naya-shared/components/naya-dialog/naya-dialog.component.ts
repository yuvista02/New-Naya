import { Component, OnInit }    from '@angular/core';
import { NgIf }                 from '@angular/common';
// Third Party Imports
import { DialogModule }         from 'primeng/dialog';
import { ButtonModule }         from 'primeng/button';
import { SidebarModule }        from 'primeng/sidebar';
// Naya Imports
import { NayaDialogService }    from '@naya-shared/services/naya-dialog.service';

@Component({
    selector: 'naya-dialog',
    templateUrl: './naya-dialog.component.html',
    styleUrls: ["./naya-dialog.component.scss"],
    standalone: true,
    imports: [
        NgIf,
        ButtonModule,
        DialogModule,
        SidebarModule,
    ]
})
export class NayaDialogComponent implements OnInit {
    constructor(
        private _nayaDialogService: NayaDialogService
    ) { }

    ngOnInit() {
    }

    public get Message() {
        return this._nayaDialogService.DialogSetting.Message;
    }

    public get Header() {
        return this._nayaDialogService.DialogSetting.Header;
    }

    public get Footer(){
        return this._nayaDialogService.DialogSetting.Footer;
    }
    public get ConfirmButtonLabel() {
        return this._nayaDialogService.DialogSetting.ConfirmButtonLabel;
    }

    public get RejectButtonLabel() {
        return this._nayaDialogService.DialogSetting.RejectButtonLabel;
    }

    public get DisplayRejectButton() {
        return this._nayaDialogService.DialogSetting.DisplayRejectButton;
    }

    public get DisplayConfirmButton() {
        return this._nayaDialogService.DialogSetting.DisplayConfirmButton;
    }

    public get DisplayDialog() {
        return this._nayaDialogService.DisplayDialog;
    }

    public set DisplayDialog(value: boolean) {
        this._nayaDialogService.DisplayDialog = value;
    }

    public get DisplaySideBar() {
        return this._nayaDialogService.DisplaySideBar;
    }

    public set DisplaySideBar(value: boolean) {
        this._nayaDialogService.DisplaySideBar = value;
    }

    public OnConfirmClick() {
    }

    public OnRejectClick() {
        this._nayaDialogService.OnRejectClick();
    }

}

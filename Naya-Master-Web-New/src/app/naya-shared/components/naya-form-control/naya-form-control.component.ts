import { NgClass, NgIf }                                    from "@angular/common";
import { Component, Input, OnInit, ViewEncapsulation }      from "@angular/core";
import { ReactiveFormsModule, Validators }                  from "@angular/forms";
// Third party imports
import { TooltipModule }                                    from "primeng/tooltip";

@Component({
    selector: "naya-form-control",
    templateUrl: "./naya-form-control.component.html",
    styleUrls: ["./naya-form-control.component.css"],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        NgIf, NgClass, ReactiveFormsModule, 
        TooltipModule
    ],
})
export class NayaFormControlComponent implements OnInit {
    @Input() NSLabel: string = String.empty;
    @Input() NSSecondLabel: string = String.empty;
    @Input() NSFormControl: any;
    @Input() NSLabelSize: number = 0;
    @Input() NSInputSize: number = 0;
    @Input() NSErrorMessageSize: number = 0;
    @Input() NSHint: string = String.empty;
    @Input() NSIsRequired: any;
    @Input() NSDisplayErrMsg: boolean = true;
    @Input() NSDisplayLabel: boolean = true;
    public NSErrorMessageStyleClass: string = String.empty;

    NSHasRequiredValidator = false;

    ngOnInit(): void {
        this.NSHasRequiredValidator = this.NSFormControl?.hasValidator(Validators.required);

        this.setErrorMessageStyleClass();
    }

    private setErrorMessageStyleClass() {

        if (this.NSErrorMessageSize) {
            this.NSErrorMessageStyleClass = `md:col-${this.NSErrorMessageSize} `;
            return;
        }

        if (this.NSLabelSize) {
            this.NSErrorMessageStyleClass = `md:col-${12 - this.NSLabelSize} `;
            
            if (this.NSLabelSize != 12)
                this.NSErrorMessageStyleClass += `col-offset-${this.NSLabelSize} `
        }
    }
    public validators() {
        return this.NSFormControl.validator(this.NSFormControl);
    }
}

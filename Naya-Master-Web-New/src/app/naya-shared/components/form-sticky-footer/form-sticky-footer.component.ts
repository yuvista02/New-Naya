import {
    Component,
    ViewEncapsulation,
    Input,
    ViewChild,
    ElementRef,
    AfterContentInit,
    AfterContentChecked,
} from "@angular/core";
import { NgClass, NgIf, NgStyle }                 from "@angular/common";
import { ProgressBarModule }                from "primeng/progressbar";
// Naya Imports
import { FormStickyFooterService }          from '@naya-shared/services/form-sticky-footer.service';

@Component({
    selector: "naya-form-sticky-footer",
    templateUrl: "./form-sticky-footer.component.html",
    styleUrls: ["./form-sticky-footer.component.scss"],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        NgIf, NgStyle, NgClass,
        ProgressBarModule
    ],
})
export class FormStickyFooterComponent
    implements AfterContentChecked, AfterContentInit
{
    private spacerEl: any;
    public footerElTop: any;
    @ViewChild("footerSpacer", { static: false }) formFooterSpacer!: ElementRef;

    public spacerElscrollWidth: number = 0;
    public spacerElscrollHeight: number = 0;
    @Input() DisplayProgressBar: boolean = false;

    constructor(public formStickyFooterService: FormStickyFooterService) {}

    ngAfterContentInit(): void {
        setTimeout(() => {
            if (this.formFooterSpacer) {
                this.spacerEl = this.formFooterSpacer.nativeElement;
                this.spacerElscrollWidth = this.spacerEl.scrollWidth
                    ? this.spacerEl.scrollWidth
                    : this.spacerElscrollWidth;

                this.spacerElscrollHeight = this.spacerEl.scrollHeight
                    ? this.spacerEl.scrollHeight
                    : this.spacerElscrollHeight;
            }
        }, 200);
    }

    ngAfterContentChecked() {
        setTimeout(() => {
            if (this.spacerEl) {
                this.spacerElscrollWidth = this.spacerEl.scrollWidth;
                this.spacerElscrollHeight = this.spacerEl.scrollHeight;
            }
        }, 200);
    }
}

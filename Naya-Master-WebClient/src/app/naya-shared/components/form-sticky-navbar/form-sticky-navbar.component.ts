import {
    Component,
    ViewEncapsulation,
    ViewChild,
    ElementRef,
    AfterContentInit,
    OnInit,
} from "@angular/core";
import { NgStyle } from "@angular/common";

@Component({
    selector: "naya-form-sticky-navbar",
    templateUrl: "./form-sticky-navbar.component.html",
    styleUrls: ["./form-sticky-navbar.component.scss"],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [NgStyle],
})
export class FormStickyNavbarComponent implements AfterContentInit, OnInit {
    public spacerEl: any;
    public spacerElscrollWidth: number = 0;
    @ViewChild("navbarSpacer", { static: false }) formNavbarSpacer!: ElementRef;
    constructor() {}

    ngOnInit(): void {
        if (this.formNavbarSpacer) {
            this.spacerEl = this.formNavbarSpacer.nativeElement;
            this.spacerElscrollWidth = this.spacerEl.scrollWidth
                ? this.spacerEl.scrollWidth
                : this.spacerElscrollWidth;
        }
    }

    ngAfterContentInit(): void {
        if (this.spacerEl) {
            this.spacerElscrollWidth = this.spacerEl.scrollWidth;
        }
    }
}

import { Component, EventEmitter, Input, Output }   from "@angular/core";
import { PDFDocumentProxy, PdfViewerModule }                         from "ng2-pdf-viewer";
import { FormsModule } from "@angular/forms";
import { TooltipModule } from "primeng/tooltip";
import { NgIf, NgClass } from "@angular/common";

@Component({
    selector: "naya-pdf-viewer",
    templateUrl: "./naya-pdf-viewer.component.html",
    styleUrls: ["./naya-pdf-viewer.component.scss"],
    standalone: true,
    imports: [
        NgIf,
        NgClass,
        TooltipModule,
        FormsModule,
        PdfViewerModule,
    ],
})
export class NayaPdfViewerComponent {

    private readonly _defaultPdfWidth: string = "400px";
    private readonly _defaultPdfHeight: string = "550px";

    @Input() public NSShowAdditionalFields: boolean = true;
    @Input() public NSPageNumber: number = 0;
    @Input() public NSLoading: boolean = false;
    @Input() public NSDisplayPageNavigation: boolean = true;
    @Input() public NSDisplayZoomControl: boolean = true;
    @Input() public MSInputPdfWidth: string = String.empty;
    @Input() public MSInputPdfHeight: string = String.empty;
    @Output() MSPageNumberEmitter: EventEmitter<any> = new EventEmitter<any>();

    public NSPdfSource: any;
    public NSTotalPages: number = 0;
    public NSZoom = 1;

    constructor() {}

    @Input() set MSInputPDFSource(blob: Blob) {
        if (!blob) {
            this.NSPdfSource = null;
            return;
        }
        this.NSPageNumber = 1;
        this.NSTotalPages = 1;
        this.MSPageNumberEmitter.emit(this.NSPageNumber);

        this.NSLoading = true;
        this.NSPdfSource = null;

        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = (e: any) => {
            this.NSPdfSource = e.target.result;
        };
    }

    public get NSPdfWidth(): string {
        return this.MSInputPdfWidth || this._defaultPdfWidth;
    }

    public get NSPdfHeight(): string {
        return this.MSInputPdfHeight || this._defaultPdfHeight;
    }

    public NSPdfAfterLoadComplete(pdf: PDFDocumentProxy) {
        this.NSTotalPages = pdf?._pdfInfo?.numPages;
        this.NSLoading = false;
    }

    public NSOnClickNext() {
        if (this.NSPageNumber == this.NSTotalPages) {
            return;
        }
        this.NSPageNumber++;
        this.MSPageNumberEmitter.emit(this.NSPageNumber);
    }

    public NSOnClickPrevious() {
        if (this.NSPageNumber == 1) {
            return;
        }
        this.NSPageNumber--;
        this.MSPageNumberEmitter.emit(this.NSPageNumber);
    }

    public NSOnClickZoomIn() {
        this.NSZoom++;
    }

    public NSOnClickZoomOut() {
        if (this.NSZoom == 1) {
            return;
        }
        this.NSZoom--;
    }

    public NSOnChangeInputPageNumber() {
        if(this.NSPageNumber <=0) {
            this.NSPageNumber = 1;
        } else if (this.NSPageNumber > this.NSTotalPages) {
            this.NSPageNumber = this.NSTotalPages;
        } 

        this.MSPageNumberEmitter.emit(this.NSPageNumber);
    }
}

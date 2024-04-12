import { NgIf, NgTemplateOutlet }                                     from "@angular/common";
import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef, ViewChild }   from "@angular/core";
// Third party imports
import { ButtonModule }                             from "primeng/button";
import { FileUpload, FileUploadHandlerEvent, FileUploadModule } from "primeng/fileupload";
import { InputTextModule }                          from "primeng/inputtext";
import { TooltipModule }                            from "primeng/tooltip";
// Naya Imports
import { NayaTemplateDirective } from "@naya-shared/directives/naya-template.directive";
import { NayaDateFormatSwitch } from "../../naya-date-format-switch/naya-date-format-switch.component";
@Component({
    selector: "naya-table-header",
    templateUrl: "./naya-table-header.component.html",
    styleUrls: ["./naya-table-header.component.scss"],
    standalone: true,
    imports: [
        NgIf, NgTemplateOutlet,
        InputTextModule,
        ButtonModule,
        TooltipModule,
        FileUploadModule,
        NayaDateFormatSwitch
    ],
})
export class NayaTableHeaderComponent {
    @Input() NSPageTitle: string = String.empty;
    @Input() NSEnableSearch: boolean = false;
    @Input() NSDisplayRouteBackButton: boolean = false;
    @Input() NSDisplayCreateButton: boolean = true;
    @Input() NSDisplayFindButton: boolean = false;
    @Input() NSDisplayUploadButton: boolean = false;
    @Input() NSAcceptedFileExtension: string = String.empty;

    @Input() public NSDisplaySecondaryButton: boolean = false;
    @Input() public NSSecondaryButtonIcon: string = String.empty;
    @Input() public NSSecondaryButtonToolTip: string = String.empty;
    @Input() public NSDisplayDateTimeFormat: boolean = false;

    @Output() public NSEventOnClickRouteBack = new EventEmitter();
    @Output() public NSEventOnClickCreate = new EventEmitter();
    @Output() public NSEventOnClickFind = new EventEmitter();
    @Output() public NSEventOnSearchInput = new EventEmitter();
    @Output() public NSEventOnClickSecondary = new EventEmitter();
    @Output() public NSEventOnUploadFile: EventEmitter<FileUploadHandlerEvent> = new EventEmitter();
    @Output() public NSEventOnClickDateTimeFormat = new EventEmitter();

    @ViewChild('NSFileUpload') NSFileUpload!: FileUpload;
    @ContentChild(NayaTemplateDirective, { static: false }) NSTemplateDirective!: NayaTemplateDirective;
    public NSFilterTemplate: TemplateRef<any> | null = null;
    public NSButtonTemplate: TemplateRef<any> | null = null;
    ngOnInit(){
        this.NSPageTitle = this.NSPageTitle.getDisplayName();
    }
    ngAfterContentInit() {
        this.NSFilterTemplate = this.NSTemplateDirective?.MSGetFilterTemplate();
        this.NSButtonTemplate = this.NSTemplateDirective?.MSGetButtonTemplate();
    }
    public OnClickRouteBack() {
        this.NSEventOnClickRouteBack.emit();
    }

    public OnClickCreate() {
        this.NSEventOnClickCreate.emit();
    }

    public OnClickFind() {
        this.NSEventOnClickFind.emit();
    }

    public OnSearchInput(searchInput: string) {
        this.NSEventOnSearchInput.emit(searchInput);
    }

    public OnClickSecondary() {
        this.NSEventOnClickSecondary.emit();
    }
    public OnUploadFile(event: FileUploadHandlerEvent) {
        this.NSEventOnUploadFile.emit(event);
    }

    public MSClearFile(): void {
        this.NSFileUpload.clear();
    }
    
    public OnChangeDateFormatSwitch(event: string) {
        this.NSEventOnClickDateTimeFormat.emit(event);
    }
}

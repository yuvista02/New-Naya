import { NgIf }                                         from "@angular/common";
import { Component, EventEmitter, Input, Output }       from "@angular/core";
// Third party imports
import { TooltipModule }                                from "primeng/tooltip";
import { RippleModule }                                 from "primeng/ripple";
import { ButtonModule }                                 from "primeng/button";
import { FileUploadHandlerEvent, FileUploadModule }     from "primeng/fileupload";
// Naya Imports
import { EmptyStateComponent }                          from "@naya-shared/components/empty-state/empty-state.component";

@Component({
    selector: "naya-table-page",
    templateUrl: "./naya-table-page.component.html",
    styleUrls: ["./naya-table-page.component.scss"],
    standalone: true,
    imports: [
        NgIf,
        EmptyStateComponent,
        ButtonModule,
        RippleModule,
        TooltipModule,
        FileUploadModule
    ],
})
export class NayaTablePageComponent {
    @Input() public NSItemList: any[] = [];
    @Input() public NSDisplayRouteBackButton: boolean = false;
    @Input() public NSDisplayCreateButton: boolean = true;
    @Input() public NSDisplayFindButton: boolean = false;
    @Input() public NSPageTitle: string = String.empty;
    
    @Input() public NSDisplaySecondaryButton: boolean = false;
    @Input() public NSSecondaryButtonIcon: string = String.empty;
    @Input() public NSSecondaryButtonToolTip: string = String.empty;
    @Input() public MSNumberOfFilteredTableRows: number = 0;

    @Output() public MSEventOnClickRouteBack = new EventEmitter();
    @Output() public MSEventOnClickCreate = new EventEmitter();
    @Output() public MSEventOnClickFind = new EventEmitter();
    @Output() public MSEventOnClickSecondary = new EventEmitter();
    
    @Input() NSDisplayUploadButton: boolean = false;
    @Input() NSAcceptedFileExtension: string = String.empty;
    @Output() public MSEventOnUploadFile: EventEmitter<FileUploadHandlerEvent> = new EventEmitter();

    constructor() {}

    public get NSHasItems(): boolean {
        return this.NSItemList && this.NSItemList.length > 0;
    }

    public get NSItemCount(): string {
        let count;
        
        if (this.MSNumberOfFilteredTableRows || this.MSNumberOfFilteredTableRows == 0) {
            count = this.MSNumberOfFilteredTableRows;
        }
        else {
            count= this.NSItemList ? this.NSItemList.length : 0;
        }
        
        return `Number of Items: ${count}`;
    }

    public NSOnClickRouteBack() {
        this.MSEventOnClickRouteBack.emit();
    }

    public NSOnClickCreate() {
        this.MSEventOnClickCreate.emit();
    }

    public OnClickFind() {
        this.MSEventOnClickFind.emit();
    }

    public OnClickSecondary() {
        this.MSEventOnClickSecondary.emit();
    }
    
    public OnUploadFile(event: FileUploadHandlerEvent) {
        this.MSEventOnUploadFile.emit(event);
    }
}

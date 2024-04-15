// Naya Auto Generated (1.6.0) at 4/10/2024 10:06:44 AM
import { Component, Input, OnInit,
    ViewEncapsulation }                         from "@angular/core";
import { 
    NgClass, NgFor, NgStyle,
    NgSwitch, NgSwitchCase,
    NgSwitchDefault }                           from "@angular/common";
// Third Party imports 
import { ButtonModule }                         from "primeng/button";
import { InputTextModule }                      from "primeng/inputtext";
import { Table, TableFilterEvent, TableModule } from "primeng/table";
// Naya imports
import { DomainRouter }                         from "@naya-domain/domain.router";
import { FieldNames }                           from '@naya-shared/constants/field-names';
import { TableColumn }                          from '@naya-shared/types/table-column.type'
import { NayaTablePageComponent }               from '@naya-shared/components/naya-maintenance-page/naya-table-page/naya-table-page.component';
import { NayaTableHeaderComponent }             from '@naya-shared/components/naya-maintenance-page/naya-table-header/naya-table-header.component';
import { NayaCustomDropdownComponent }          from "@naya-shared/components/naya-custom-dropdown/naya-custom-dropdown.component";
import { NayaRoleGet }                          from "@naya-domain/api/response/naya-roles-get.response";

@Component({
    selector: "naya-roles-table",
    templateUrl: "./naya-roles-table.component.html",
    styleUrls: ['./naya-roles-table.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        NgFor, NgClass, NgSwitch, NgSwitchCase, NgSwitchDefault, NgStyle,
        TableModule, ButtonModule, InputTextModule,
        NayaTablePageComponent, NayaTableHeaderComponent, NayaCustomDropdownComponent
    ],
    providers: [DomainRouter]
})
export class NayaRoleTableComponent implements OnInit {
    @Input() public NSPageTitle: string = String.empty;
    @Input() public NSNayaRoleList: NayaRoleGet[] = [];
    @Input() public NSLoading = true;

    public NSTableColumns: TableColumn[] = [
		{field: FieldNames.NayaRoleName.toCamelCase(), header: FieldNames.NayaRoleName.getDisplayName(), class: 'w-25per'},
		{field: FieldNames.ExternalRoleID.toCamelCase(), header: FieldNames.ExternalRoleID.getDisplayName(), class: 'w-25per'},
		{field: FieldNames.NumberOfConnections.toCamelCase(), header: FieldNames.NumberOfConnections.getDisplayName(), class: 'w-25per'},

        // Column PlaceHolder - DO NOT REMOVE
        {field: FieldNames.Actions.toCamelCase(), header: FieldNames.Actions, class: 'w-20per'}
    ];

    public NSEnableSearch: boolean = true;
    public NSDisplayFind: boolean = false;
    public NSDisplayCreate: boolean = true;
    public NSNumberOfFilteredTableRows: number = 0;
    public NSScrollHeight: string = "calc(100vh - 220px)";
    constructor(private _domainRouter: DomainRouter) {}

    ngOnInit(): void {
        this.NSNumberOfFilteredTableRows = this.NSNayaRoleList.length ?? 0;
    }

    public OnClickItem(item: NayaRoleGet): void {
        this._domainRouter.RouteToNayaRoleEdit(item.nayaRoleID);
    }

    public OnClickCreate(): void {
        this._domainRouter.RouteToNayaRoleCreate();
    }

    public OnClickFind(): void {
        this._domainRouter.RouteToNayaRole();
    }

    public OnSearchInput(NayaRoleTable: Table, searchInput: string): void {
        NayaRoleTable.filterGlobal(searchInput, "contains");
    }
    
    public OnFilter(event: TableFilterEvent): void {
        this.NSNumberOfFilteredTableRows = event.filteredValue.length;
    }
}

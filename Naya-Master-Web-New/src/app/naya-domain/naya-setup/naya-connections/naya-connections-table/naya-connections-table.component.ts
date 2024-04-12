// Naya Auto Generated (1.6.0) at 4/10/2024 11:11:15 AM
import {
    Component, Input, OnInit,
    ViewEncapsulation
} from "@angular/core";
import {
    NgClass, NgFor, NgStyle,
    NgSwitch, NgSwitchCase,
    NgSwitchDefault
} from "@angular/common";
// Third Party imports
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { Table, TableModule } from "primeng/table";
// Naya imports
import { DomainRouter } from "@naya-domain/domain.router";
import { FieldNames } from '@naya-shared/constants/field-names';
import { TableColumn } from '@naya-shared/types/table-column.type'
import { NayaTablePageComponent } from '@naya-shared/components/naya-maintenance-page/naya-table-page/naya-table-page.component';
import { NayaTableHeaderComponent } from '@naya-shared/components/naya-maintenance-page/naya-table-header/naya-table-header.component';
import { NayaCustomDropdownComponent } from "@naya-shared/components/naya-custom-dropdown/naya-custom-dropdown.component";
import { UserConnectionFind } from "@naya-domain/api/response/naya-connections-find.response";
import { UserConnectionGet } from "@naya-domain/api/response/naya-connections-get.response";

@Component({
    selector: "naya-connections-table",
    templateUrl: "./naya-connections-table.component.html",
    styleUrls: ['./naya-connections-table.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [NgFor, NgClass, NgSwitch, NgSwitchCase, NgSwitchDefault, NgStyle,
        TableModule, ButtonModule, InputTextModule,
        NayaTablePageComponent, NayaTableHeaderComponent, NayaCustomDropdownComponent],
    providers: [DomainRouter]
})
export class UserConnectionTableComponent implements OnInit {
    @Input() public NSPageTitle: string = String.empty;
    @Input() public NSUserConnectionList: UserConnectionFind[] = [];
    @Input() public NSLoading = true;

    public NSTableColumns: TableColumn[] = [
        { field: FieldNames.ConnectionName.toCamelCase(), header: FieldNames.ConnectionName.getDisplayName(), class: "w-15per", },
        { field: FieldNames.DataURL.toCamelCase(), header: FieldNames.DataURL.getDisplayName(), class: "w-25per", },
        { field: FieldNames.WebAppURL.toCamelCase(), header: FieldNames.WebAppURL.getDisplayName(), class: "w-25per", },
        { field: FieldNames.ProductName.toCamelCase(), header: FieldNames.ProductName.getDisplayName(), class: "w-10per", },

        // Column PlaceHolder - DO NOT REMOVE
        { field: FieldNames.Actions.toCamelCase(), header: FieldNames.Actions, class: 'w-20per' }
    ];

    public NSEnableSearch: boolean = true;
    public NSDisplayFind: boolean = true;
    public NSDisplayCreate: boolean = true;

    constructor(private _domainRouter: DomainRouter) { }

    ngOnInit(): void {
    }

    public OnClickItem(item: UserConnectionGet): void {
        this._domainRouter.RouteToUserConnectionEdit(item.nayaConnectionID);
    }

    public OnClickCreate(): void {
        this._domainRouter.RouteToUserConnectionCreate();
    }

    public OnClickFind(): void {
        this._domainRouter.RouteToUserConnection();
    }

    public OnSearchInput(UserConnectionTable: Table, searchInput: string): void {
        UserConnectionTable.filterGlobal(searchInput, "contains");
    }
}

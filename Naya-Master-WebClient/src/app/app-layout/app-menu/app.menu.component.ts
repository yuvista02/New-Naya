import { Component, OnInit } from "@angular/core";
import { AppComponent } from "@app/app.component";
import { UserConnectionService } from "@naya-core/services/user-session.service";
import { MenuItem } from "primeng/api";
import { AppMenuitemComponent } from "./app.menuitem.component";
import { NayaMenuItemService } from "@app/naya-menu-item.service";
import { NgIf, NgFor, AsyncPipe } from "@angular/common";

@Component({
    selector: "app-menu",
    templateUrl: "./app.menu.component.html",
    styleUrls: ["./app.menu.component.scss"],
    standalone: true,
    imports: [NgIf, NgFor, AppMenuitemComponent, AsyncPipe]
})
export class AppMenuComponent implements OnInit {

    public NSMenuItems: MenuItem[] = [];
    
    constructor(
        public app: AppComponent,
        private _userSessionService: UserConnectionService,
        private _nayaMenuItemService: NayaMenuItemService
    ) { }

    ngOnInit() {
        this.NSMenuItems = this._nayaMenuItemService.GetMenuItems();
    }

    public get NSShowPagesRoute(): boolean {
        return this._userSessionService.IsConnectedToDatabase();
    }
}

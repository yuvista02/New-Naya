import { Injectable } from '@angular/core';
// Third party imports
import { MenuItem } from 'primeng/api';
// Naya Imports
import { DomainMenuItems } from '@naya-domain/domain.menu';
@Injectable()
export class NayaMenuItemService {

    private _menuItems: MenuItem[] = [];

    constructor() { }

    public GetMenuItems() {

        this._menuItems = DomainMenuItems;
        return this._menuItems;
    }
}
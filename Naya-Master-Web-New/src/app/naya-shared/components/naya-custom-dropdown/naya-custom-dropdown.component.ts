import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TieredMenu, TieredMenuModule } from 'primeng/tieredmenu';

@Component({
    selector: 'naya-custom-dropdown',
    templateUrl: './naya-custom-dropdown.component.html',
    styleUrls: ['./naya-custom-dropdown.component.css'],
    standalone: true,
    imports: [TieredMenuModule]
})

export class NayaCustomDropdownComponent {
    @Input() model: MenuItem[] = [];


    public OnClickIcon(menu: TieredMenu, $event: any) {
        menu.toggle($event)

    }
}

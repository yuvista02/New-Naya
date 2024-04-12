import { Component, Input } from '@angular/core';
import { ModifiedField } from '@naya-shared/models/modified-field.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'naya-notification-modified-fields-view',
    templateUrl: './naya-notification-modified-fields-view.component.html',
    styleUrls: ['./naya-notification-modified-fields-view.component.scss'],
    standalone: true,
    imports: [NgFor, NgIf]
})
export class NayaNotificationModifiedFieldsViewComponent {

  @Input() public NSModifiedFieldList: ModifiedField[]
  constructor() { }

}

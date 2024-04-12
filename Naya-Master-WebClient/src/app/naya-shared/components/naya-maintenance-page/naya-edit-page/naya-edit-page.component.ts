import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { NayaLoadingComponent } from '../../naya-loading/naya-loading.component';
import { NgIf } from '@angular/common';
import { FormStickyFooterService } from '@app/naya-shared/services/form-sticky-footer.service';

@Component({
    selector: 'naya-edit-page',
    templateUrl: './naya-edit-page.component.html',
    styleUrls: ['./naya-edit-page.component.scss'],
    standalone: true,
    imports: [NgIf, NayaLoadingComponent, TooltipModule, ButtonModule],
    providers:[      
      FormStickyFooterService, 
    ]
})
export class NayaEditPageComponent {
  @Input() public NSLoading: boolean = true;
  @Input() public NSPageTitle: string = String.empty;
  @Input() public NSDisplayRemoveButton: boolean = false;
  @Input() public NSDisplayRouteBackButton: boolean = false;
  @Input() public NSDisplaySecondaryButton: boolean = false;
  @Input() public NSSecondaryButtonToolTip: string = String.empty;
  @Input() public NSSecondaryButtonIcon: string = String.empty;

  @Output() public NSOnClickEventRouteBack = new EventEmitter();
  @Output() public NSOnClickEventRemove = new EventEmitter();
  @Output() public NSOnClickEventSecondaryButton = new EventEmitter();

  constructor() {
  }
  
  public NSOnRemoveClick() {
    this.NSOnClickEventRemove.emit();
  }

  public NSOnSecondaryButtonClick() {
    this.NSOnClickEventSecondaryButton.emit();
  }

  public OnClickRouteBack() {
    this.NSOnClickEventRouteBack.emit();
  }
}

import { EventEmitter, Input, Output, Component }         from '@angular/core';
import { NgIf }                                           from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { RippleModule }                                   from 'primeng/ripple';
import { ButtonModule }                                   from 'primeng/button';
import { FormStickyNavbarComponent }                      from '@naya-shared/components/form-sticky-navbar/form-sticky-navbar.component';
import { FormStickyFooterComponent }                      from '@naya-shared/components/form-sticky-footer/form-sticky-footer.component';
@Component({
    selector: 'naya-form-page',
    templateUrl: './naya-form-page.component.html',
    styleUrls: ['./naya-form-page.component.scss'],
    standalone: true,
    imports: [
      FormsModule, ReactiveFormsModule, NgIf, ButtonModule, RippleModule, 
      FormStickyNavbarComponent, FormStickyFooterComponent]
})
export class NayaFormPageComponent {

  @Input() public NSParentForm!: FormGroup;
  @Input() public NSIsFormSaving: boolean = false;
  @Input() public NSDisplaySaveButton: boolean = true;
  @Output() public NSOnClickEventSubmit = new EventEmitter();
  @Output() public NSOnClickEventCancel = new EventEmitter();

  constructor() { }

  public OnClickSubmit() {
    this.NSOnClickEventSubmit.emit();
  }

  public OnClickCancel() {
    this.NSOnClickEventCancel.emit();
  }

}

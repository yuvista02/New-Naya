import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'naya-search-field',
    templateUrl: './search-field.component.html',
    styleUrls: ['./search-field.component.css'],
    standalone: true,
    imports: [FormsModule, InputTextModule, NgClass]
})
export class SearchFieldComponent implements OnInit {

  @Input() NSSearchTerm: string;
  @Output() MSSearchTermOutput: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public HasSearchFieldValue() {
    return  this.NSSearchTerm && this.NSSearchTerm.length;
  }

  public NSOnButtonClearClick() {
    this.NSSearchTerm = String.empty;
    this.NSOnSearchFieldInputChange();
  }

  public NSOnSearchFieldInputChange() {
    this.MSSearchTermOutput.emit(this.NSSearchTerm);
  }
}

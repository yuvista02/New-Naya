import {Component, Input, OnInit} from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'naya-view-field',
    templateUrl: './view-field.component.html',
    styleUrls: ['./view-field.component.css'],
    standalone: true,
    imports: [NgIf]
})

export class ViewFieldComponent implements OnInit {
    @Input() label: string;

    ngOnInit(): void {
    }
}

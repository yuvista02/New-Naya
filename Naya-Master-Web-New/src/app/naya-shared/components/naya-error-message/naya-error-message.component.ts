import { NgIf, NgStyle } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
// Third party imports
import { Message } from "primeng/api";
import { MessagesModule } from "primeng/messages";

@Component({
    selector: "naya-error-message",
    templateUrl: "./naya-error-message.component.html",
    styleUrls: ["./naya-error-message.component.scss"],
    standalone: true,
    imports: [
        NgIf,
        MessagesModule,
        NgStyle,
    ],
})
export class NayaErrorMessageComponent implements OnInit {
    @Input() messages: Message[] = [];
    constructor() { }

    ngOnInit(): void {
    }
}

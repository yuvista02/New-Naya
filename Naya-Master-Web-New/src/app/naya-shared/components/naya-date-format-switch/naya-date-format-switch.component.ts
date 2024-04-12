import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { TableCheckbox } from "primeng/table";

@Component({
    selector: "naya-date-format-switch",
    templateUrl: "./naya-date-format-switch.component.html"
})
export class NayaDateFormatSwitch implements OnInit {
    @Output() private NSOutputDateFormatSwitch: EventEmitter<any> = new EventEmitter();

    public NSTimeSwitch: boolean = false;

    public NSSwitchOffValue: string = "Local Time";
    public NSSwitchOnValue: string = "UTC Time";

    constructor() {}

    ngOnInit(): void {
      this.NSOutputDateFormatSwitch.emit(DateTimeFormat.UtcToLocal);
    }

    public OnChangeDateFormatSwitch(event: TableCheckbox) {
      const selectedFormat = event.checked ? DateTimeFormat.NayaRegular : DateTimeFormat.UtcToLocal;
      this.NSOutputDateFormatSwitch.emit(selectedFormat);
    }
}

class DateTimeFormat {
  public static readonly UtcToLocal: string = "UtcToLocal";
  public static readonly NayaRegular: string = "NayaRegular";
}

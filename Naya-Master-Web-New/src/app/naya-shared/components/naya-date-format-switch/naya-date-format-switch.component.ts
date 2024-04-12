import { Component, EventEmitter, OnInit, Output }    from "@angular/core";
import { NgStyle }                                    from "@angular/common";
import { FormsModule }                                from "@angular/forms";
import { InputSwitchModule }                          from "primeng/inputswitch";

@Component({
    selector: "naya-date-format-switch",
    templateUrl: "./naya-date-format-switch.component.html",
    standalone: true,
    imports: [
      NgStyle, 
      InputSwitchModule,
      FormsModule,
    ]
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

    public OnChangeDateFormatSwitch(checked: boolean) {
      const selectedFormat = checked ? DateTimeFormat.NayaRegular : DateTimeFormat.UtcToLocal;
      this.NSOutputDateFormatSwitch.emit(selectedFormat);
    }
}

class DateTimeFormat {
  public static readonly UtcToLocal: string = "UtcToLocal";
  public static readonly NayaRegular: string = "NayaRegular";
}

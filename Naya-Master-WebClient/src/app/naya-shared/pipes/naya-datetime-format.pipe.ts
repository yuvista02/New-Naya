import { DatePipe }                 from "@angular/common";
import { Pipe, PipeTransform }      from "@angular/core";

@Pipe({
    name: "nayaDateTimeFormat",
    standalone: true,
})
export class NayaDateTimeFormatPipe implements PipeTransform {
    constructor(private datePipe: DatePipe) {}

    transform(value: any, args?: any): any {
        const dateOnlyFormat = "MM/dd/YYYY";
        const dateTimeFormat = "MM/dd/YYYY HH:mm a";
        const twelveHourFormat = "MM/dd/YYYY hh:mm a";

        const dateString = new Date(value).toLocaleString();

        if (value) {
            if (args === DateTimeFormat.Date) {
                return this.datePipe.transform(value, dateOnlyFormat);
            } else if (args === DateTimeFormat.UtcToLocal) {
                return this.datePipe.transform(
                    dateString + " UTC",
                    twelveHourFormat
                );
            } else if (args === DateTimeFormat.TwelveHourTimeFormat) {
                return this.datePipe.transform(value, twelveHourFormat);
            } else {
                return this.datePipe.transform(value, dateTimeFormat);
            }
        } else {
            value = "";
        }
    }
}

class DateTimeFormat {
    public static readonly Date: string = "date";
    public static readonly UtcToLocal: string = "utcToLocal";
    public static readonly TwelveHourTimeFormat: string = "12hr";
}

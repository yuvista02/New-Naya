import { Injectable } from '@angular/core';
import { NayaApplicationInsight } from '@naya-core/services/naya-application-insight.service';
@Injectable()
export class FileSaverService {
    constructor(private _nayaApplicationInsight: NayaApplicationInsight) { }
    public SaveFile(data: Blob, contentDisposition: string | null) {
        if (data == null)
            return;

        const defaulFileName = 'file';
        const blob = new Blob([data], { type: 'application/octet-stream' });

        // Extract filename from content disposition header
        const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = fileNameRegex.exec(contentDisposition || '');
        let fileName = matches && matches.length > 1 ? matches[1] : defaulFileName;

        // Create a download link and trigger the download
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        if (fileName) {
            fileName = fileName.replaceAll('"', '');
            link.download = fileName;
        }
        this._nayaApplicationInsight.logEvent(`FileSaverService.SaveFile(): Downloading ${fileName}`)
        link.click();
    }
}
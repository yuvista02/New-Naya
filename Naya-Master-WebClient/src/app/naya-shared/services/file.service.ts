import { Injectable }               from "@angular/core";
//MS Imports
import { FileResponse }         from "@naya-shared/models/file-response.model";

@Injectable()
export class FileService {

    public readonly fileUploadLimit: number = 100;
    
    constructor() {
    }


    public ConvertToFileResponse(blob: Blob, fileName: string): FileResponse {
        const fileResponse = new FileResponse();
        fileResponse.blob = blob;
        fileResponse.fileName = fileName;
        return fileResponse;
    }

    public CheckFileUploadSize(file: File): boolean {
        const sizeLimit = this.fileUploadLimit * 1048576;
        if (file && file.size > sizeLimit) {
            return false;
        } else {
            return true;
        }
    }

    public ViewPDF(fileResponse: FileResponse) {
        const fileName = fileResponse?.fileName?.split("-");
        const fileNameOnly = (fileName && fileName[fileName?.length - 1]) ? fileName[fileName?.length - 1]?.replace(/[0-9]/g, '') : fileResponse.fileName;

        const fileURL = URL.createObjectURL(fileResponse.blob);
        const windowInstance: any = window.open(fileURL);

        windowInstance.onload = () => {
            windowInstance.document.title = fileNameOnly;
            window.URL.revokeObjectURL(fileURL);
        };
    }
}
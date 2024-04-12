
import { Directive, Output, Input, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { MessageSeverity } from '../constants/message-severity';
import { NayaFileUpload } from '../models/naya-file-upload.model';
import { NayaMessageService } from '@naya-shared/services/naya-message.service';

@Directive({
    selector: '[nayaDragDrop]',
    standalone: true
})
export class NayaDragDropDirective {

    private _fileUploadLimitInMB: number = 100; // 100MB (104,857,600 bytes)

    @Input() fileType: string[];
    @Input() allowDrop: any;
    @Input() allowMultiple: string | null;
    @Output() outputFileDropped = new EventEmitter<any>();

    constructor(private nayaMessageService: NayaMessageService) {
        this.allowDrop = true;
    }

    @HostBinding('style.background-color') public background: any;
    @HostBinding('style.opacity') public opacity = '1';

    // Dragover listener
    @HostListener('dragover', ['$event']) onDragOver(evt: Event) {
        if (!this.allowDrop || this.allowDrop === 'false') {
            return;
        }
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#9ecbec';
        this.opacity = '0.8';
    }

    // Dragleave listener
    @HostListener('dragleave', ['$event']) public onDragLeave(evt: Event) {
        if (!this.allowDrop || this.allowDrop === 'false') {
            return;
        }

        evt.preventDefault();
        evt.stopPropagation();
        this.background = '';
        this.opacity = '1';
    }

    // Drop listener
    @HostListener('drop', ['$event']) public ondrop(evt: any) {
        if (!this.allowDrop || this.allowDrop === 'false') {
            return;
        }

        evt.preventDefault();
        evt.stopPropagation();
        this.background = '';
        this.opacity = '1';

        if (this.allowMultiple === "true") {
            const filesArrayList: any = Array.from(
                evt.dataTransfer.files || []
            );

            if (!filesArrayList) return;

            this.handleFileInputMultiple(filesArrayList);
        } else {
            const file =
                (evt.dataTransfer.files?.length) > 0
                    ? evt.dataTransfer.files.item(0)
                    : null;

            if (file) {
                this.handleFileInput(file);
            }
        }
    }

    private handleFileInput(file: File) {
        if (!this.validateFileSizeAndType(file)) {
            return;
        }

        const fileToUpload = new NayaFileUpload();

        fileToUpload.file = file;
        fileToUpload.fileName = file.name;

        this.outputFileDropped.emit(fileToUpload);
    }

    handleFileInputMultiple(files: File[]) {
        const fileToUploadList: NayaFileUpload[] = [];

        files.forEach((file) => {
            if (!this.validateFileSizeAndType(file)) {
                return;
            }

            fileToUploadList.push({ file: file, fileName: file.name });
        });

        this.outputFileDropped.emit(fileToUploadList);
    }

    private validateFileSizeAndType(file: File): boolean {
        if (!file) {
            return false;
        }

        const isValidSize: boolean = this.CheckFileUploadSize(file);
        let isFileValidType: boolean = false;

        for (let index = 0; index < this.fileType.length; index++) {
        if( file.type === this.fileType[index] ) {
            isFileValidType = true
        }
      }
            


        if (!isValidSize) {
            this.nayaMessageService.showToastMessage(MessageSeverity.Error, `File size should be less than ${this._fileUploadLimitInMB} MB.`);
        }

        if (!isFileValidType) {
            this.nayaMessageService.showToastMessage(MessageSeverity.Error, `Invalid file.`);
        }

        return (isValidSize && isFileValidType);
    }


    private CheckFileUploadSize(file: File): boolean {
        return file.size < this._fileUploadLimitInBytes;
    }

    private get _fileUploadLimitInBytes(){
        return this._fileUploadLimitInMB * 1024 * 1024;
    }
}

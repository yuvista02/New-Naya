import { DatabaseDto } from '@naya-core/api/response/database.response';

export class Diagnostic implements DatabaseDto {
    productName: string = String.empty;
    apiName: string = String.empty;
    apiVersion: string = String.empty;
    databaseName: string = String.empty;
}

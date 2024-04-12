import { BooleanString } from "@naya-shared/types/boolean-string.type";

export interface UserConnection {
    disclaimerAgreementID: number;
    preferredUserName: string;
    userInfoID: number;
    userType: string;
    allowFavoriteSearchResult: BooleanString;
    connectionName: string;
    userConnectionID: 0;
    userID: 0;
    applicationLogging: string;
    applicationName: string;
    applicationVersion: string;
    windowsUser: string;
    connectedAt: string;
    validUntil: string;
    dbVersion: string;
    machineName: string;
    externalUserName: string;
    roleCode: string;
    userName: string;
    wordAutoRecovery: string;
    singleWordApp: string;
    contactHelpDesk: string;
    enableBeta: string;
    enablePreview: string;
    allowFormEditing: string;
    allowFallbackProvisionsDocumentEditing: string;
    allowAcceptReject: string;
    allowLocalBackup: string;
    allowControlChangeLog: string;
    allowReporting: string;
    allowExportDocuments: string;
    allowDocumentAuditorOnWeb: string;
    showWOPITestPage: string;
    allowDraftAssistant: string;
    allowNayaDocumentsOnWeb: string;
}

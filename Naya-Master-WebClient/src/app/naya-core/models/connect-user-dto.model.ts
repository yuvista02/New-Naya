export class ConnectUserDto {
    public applicationName: string = String.empty;
    public applicationVersion: string = String.empty;
    public environmentName: string = String.empty;
    public forceDisconnect: string = String.empty;
    public remoteIpAddress: string = String.empty;
    public connectionName: string = String.empty;
    public externalUserName: string = String.empty;
    public windowsUser: string = String.empty;
    public windowsDomain: string = String.empty;
    public processID: number = 0;
    public additionalInfo: string = String.empty;
    public allowFormEditing: string = String.empty
}
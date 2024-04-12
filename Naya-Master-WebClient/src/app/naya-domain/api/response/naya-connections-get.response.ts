// Naya Auto Generated (1.6.0) at 4/10/2024 11:11:15 AM
import { UserConnection } from '@naya-domain/api/request/naya-connections.request';
import { MenuItem } from 'primeng/api';

export interface UserConnectionGet extends UserConnection {
    nayaConnectionID: number;
    sortKey: number | null;
    nayaConnectionRoleMappingID: number | null;
    // ui
    actions: MenuItem[];

}

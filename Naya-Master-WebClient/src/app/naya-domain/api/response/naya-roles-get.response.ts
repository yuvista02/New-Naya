// Naya Auto Generated (1.6.0) at 4/10/2024 10:06:44 AM
import { NayaRole } from '@naya-domain/api/request/naya-roles.request';
import { MenuItem } from 'primeng/api';

export interface NayaRoleGet extends NayaRole {
    nayaRoleID: number;

    nayaRoleName: string;
    // ui property
    actions: MenuItem[];
}

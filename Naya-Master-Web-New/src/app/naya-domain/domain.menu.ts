// Naya Auto Generated (1.6.0) at 4/10/2024 11:11:15 AM
import { MenuItem, PrimeIcons } from 'primeng/api';
import { RoutePath } from '@naya-shared/constants/route-path';

export const DomainMenuItems: MenuItem[] = [
  {
    label: "Favorites",
    items: [{ label: RoutePath.Dashboard.getDisplayName(), icon: PrimeIcons.CHART_BAR, routerLink: [RoutePath.Dashboard] }]
  },
  {
    label: "Reports",
    items: []
  },
  {
    label: "Naya Setup",
    items: [
      // Placeholder Start
      { label: RoutePath.NayaRoles.getDisplayName(), icon: PrimeIcons.FILE, routerLink: [RoutePath.NayaRoles] },
      { label: RoutePath.UserConnection.getDisplayName(), icon: PrimeIcons.FILE, routerLink: [RoutePath.UserConnection] },
      // Placeholder End
    ]
  },
  {
    label: "Diagnostics",
    items: []
  },
  {
    label: "Charts",
    items: []
  },
];

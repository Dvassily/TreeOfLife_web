import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import {MytreeComponent} from '../../app-pages/mytree/mytree.component';
import {DownloadPageComponent} from '../../app-pages/download-page/download-page.component';
import {AuthGuardGuard} from '../../guards/auth-guard.guard';

export const AdminLayoutRoutes: Routes = [
  {
    path: '',
    redirectTo: 'mes-arbres',
    pathMatch: 'full',
  },
    { path: 'mes-arbres',      component: MytreeComponent },
    { path: 'telechargement',           component: DownloadPageComponent },
    // { path: 'table',          component: TableComponent },
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent }
];

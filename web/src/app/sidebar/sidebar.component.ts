import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/mes-arbres',     title: 'Mes Arbres',         icon:'nc-bank',       class: '' },
    { path: '/telechargement',         title: 'Telechargement',             icon:'nc-diamond',    class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];

    constructor() {
    }
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);

    }
}

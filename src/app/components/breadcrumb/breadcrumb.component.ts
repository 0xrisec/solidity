import { Component, Input, OnInit } from '@angular/core';
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons';

export interface Breadcrumb {
    label: string;
    url: string;
    icon?: string;
}

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
     styleUrls: ['./breadcrumb.component.css']
})


export class BreadcrumbComponent implements OnInit {
    @Input('breadcrumbs') breadcrumbs:Array<Breadcrumb> =[];
    public iconComponents: any = {
        "faHouseChimney" :faHouseChimney
    }
    constructor() { 
    }

    ngOnInit() {
    }

    public setBreadcrumbs(){
    }
}
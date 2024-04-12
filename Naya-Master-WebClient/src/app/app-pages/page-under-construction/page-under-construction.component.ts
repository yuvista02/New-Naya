import { Component, OnInit } from '@angular/core';
import { AppBreadcrumbService } from '@app-layout/services/app.breadcrumb.service';

@Component({
    selector: 'app-page-under-construction',
    templateUrl: './page-under-construction.component.html',
    standalone: true
})
export class PageUnderConstructionComponent implements OnInit {

  constructor(private _appBreadcrumbService: AppBreadcrumbService) { }

  ngOnInit(): void {
    this.setBreadcrumb();
  }

  setBreadcrumb() {
    this._appBreadcrumbService.setItems([
      {
        label: 'Under Construction'
      }
    ]);
  }


}

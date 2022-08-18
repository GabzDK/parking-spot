import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { AtualizarPage } from './atualizar.page';

@Injectable({ providedIn: 'root' })
export class VehicleResolver implements Resolve<any> {
  constructor(private service: HttpClient) {}

  resolve(
    route: ActivatedRouteSnapshot
  ) {
    return this.service.get(`http://localhost:8080/parking-spot/${route.paramMap.get('id')}`);
  }
}

const routes: Routes = [
  {
    path: ':id',
    component: AtualizarPage,
    resolve: {
      entity: VehicleResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtualizarPageRoutingModule {}

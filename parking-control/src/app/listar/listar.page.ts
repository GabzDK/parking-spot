import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map,switchMap } from 'rxjs/operators';

export interface ParkingSpotModel {
  id: number;
  parkingSpotNumber: string;
  licensePlateCar: string;
  brandCar: string;
  modelCar: string;
  colorCar: string;
  responsibleName: string;
  apartment: string;
  block: string;
}
export interface Root {
  content: Content[]
  pageable: Pageable
  totalElements: number
  totalPages: number
  last: boolean
  number: number
  size: number
  sort: Sort2
  numberOfElements: number
  first: boolean
  empty: boolean
}

export interface Content {
  id: string
  parkingSpotNumber: string
  licensePlateCar: string
  brandCar: string
  modelCar: string
  colorCar: string
  registrationDate: string
  responsibleName: string
  apartment: string
  block: string
}

export interface Pageable {
  sort: Sort
  pageSize: number
  pageNumber: number
  offset: number
  paged: boolean
  unpaged: boolean
}

export interface Sort {
  sorted: boolean
  unsorted: boolean
  empty: boolean
}

export interface Sort2 {
  sorted: boolean
  unsorted: boolean
  empty: boolean
}


@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {

  parkingSpot$: Observable<any>;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.parkingSpot$ = this.list$();
  }

  list$(): Observable<Root> {
    return this.http.get<Root>(`${environment.api}/parking-spot`).pipe(map(a=>a));
  }

    delete(parkId: any) {
    this.http.delete(`${environment.api}/parking-spot/${parkId}`).pipe().subscribe();

  }

  public httpConnection(connectorId: string) {
    this.http.get(`${environment.api}/listar`).subscribe((data) => console.log(data));
  }
}

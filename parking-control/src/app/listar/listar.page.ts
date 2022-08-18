import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {
  

  constructor(
    private http: HttpClient,

  ) { }

  ngOnInit() {
    
  }

  public async listar (){
    const url = `${environment.api}/parking-spot`;
    const lista = await this.http.get(url).toPromise().then((data) => data);
    console.log(lista); 
  }

  public httpConnection(connectorId: string) {
    this.http.get(`${environment.api}/listar`).subscribe((data) => console.log(data));
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  
  public form: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [],
      parkingSpotNumber: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(10)])
      ],
      licensePlateCar: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(7)])
      ],
      brandCar: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(70)])
      ],
      modelCar: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(70)])
      ],
      colorCar: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(70)])
      ],
      responsibleName: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(70)])
      ],
      apartment: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(30)])
      ],
      block: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(30)])
      ]
      
    })
  }

  ionViewWillEnter() {
    if (this.activatedRoute.snapshot.data.entity) {
      this.form.patchValue(this.activatedRoute.snapshot.data.entity);
    }
  }

  public async salvar(){
    const url = `${environment.api}/parking-spot`;
    const parkingSpot = this.form.value;
    this.form.value.id = 2;
    console.log(parkingSpot)
    try{
      if(this.form.valid){
        const form = this.form.getRawValue();
        if(form.id == 'new')
        delete form.id;
      }
      if(parkingSpot.id){
        await this.http.put(url, parkingSpot).toPromise();
      }
      else{
        await this.http.post(url, parkingSpot).toPromise();
      }
    }catch(error){
      console.log(error);
    }
  }

  public httpConnection(connectorId: string){
    this.http.get(`${environment.api}/cadastro`).subscribe((data) => console.log(data) );
  }
}

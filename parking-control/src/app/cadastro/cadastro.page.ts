import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public form: FormGroup;

  public isLoading = false;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController
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

  public async salvar() {
    const url = `${environment.api}/parking-spot`;
    const parkingSpot = this.form.value;
    this.isLoading = true;
    try {
      if (this.form.valid) {
        const form = this.form.getRawValue();
        if (form.id == 'new') {
          delete form.id;
        }
      }
      delete parkingSpot.id;
      await this.http.post(url, parkingSpot).toPromise();
      const toast = await this.toastController.create({
        message: 'Salvo com sucesso',
        position: 'top',
        duration: 2000
      });
      toast.present();
    } catch (error) {
      console.log(error);
    }
    this.isLoading = false;
  }

  public httpConnection(connectorId: string) {
    this.http.get(`${environment.api}/cadastro`).subscribe((data) => console.log(data));
  }
}
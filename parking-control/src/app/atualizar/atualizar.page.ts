import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-atualizar',
  templateUrl: './atualizar.page.html',
  styleUrls: ['./atualizar.page.scss'],
})
export class AtualizarPage implements OnInit {

  public form: FormGroup;

  public isLoading = false;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public toastController: ToastController
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
    });
    this.form.patchValue(this.activatedRoute.snapshot.data.entity);
  }
  public async update() {
    const licensePlateCar = this.form.value.licensePlateCar;
    delete this.form.value.licensePlateCar;
    this.isLoading = true;
    this.http.put(`http://localhost:8080/parking-spot/${licensePlateCar}`, this.form.value)
    .subscribe(
      async (response) => {
        this.isLoading = false;
        const toast = await this.toastController.create({
          message: 'Salvo com sucesso',
          position: 'top',
          duration: 2000
        });
        toast.present();
      });
  }
}

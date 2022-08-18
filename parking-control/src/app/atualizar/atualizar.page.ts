import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-atualizar',
  templateUrl: './atualizar.page.html',
  styleUrls: ['./atualizar.page.scss'],
})
export class AtualizarPage implements OnInit {

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
  public async update() {
    this.http.put('http://localhost:8080/parking-control/parking-spots', this.form.value).subscribe(
      (response) => {
        console.log(response);
      });
  }
}

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
    .ng-invalid.ng-touched:not(form) {
      border: 1px solid red;
    }
  `]
})
export class TemplateComponent {

  user: Object = {
    name: null,
    surname: null,
    email: null,
    country: "",
    sex: "",
    accept: false
  }

  countries = [{
    code: "ESP",
    name: "Spain"
  },
  {
    code: "CRI",
    name: "Costa Rica"
  },
  {
    code: "POR",
    name: "Portugal"
  }]

  sexs: string[] = ["Man", "Woman", "Not defined"]

  constructor() { }


  save(formToSave: NgForm) {
    console.log('form posted');
    console.log('forma', formToSave);
    console.log(this.user);
  }
}

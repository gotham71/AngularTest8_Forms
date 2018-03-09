import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { promise } from 'protractor';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  form2Work: FormGroup;

  user: any = {
    fullName: {
      name: "Joseph",
      surname: "Ramirez"
    },
    email: "josemaramirez@hotmail.com",
    freetimes: ['Run', 'Sleep', 'Eat']
  }

  constructor() {

    console.log(this.user);



    this.form2Work = new FormGroup({

      'fullName': new FormGroup({
        'name': new FormControl('', [Validators.required, Validators.minLength(3)]),
        'surname': new FormControl('', [Validators.required, this.noRamirez])
      }),
      'email': new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      'freetimes': new FormArray([
        new FormControl('Run', Validators.required)
      ]),
      'username': new FormControl('', Validators.required, [this.existusername]),
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl()
    })

    this.form2Work.controls['password2'].setValidators([
      Validators.required,
      this.notEqual.bind(this.form2Work)
    ])
    // this.form2Work.setValue(this.user);

    this.form2Work.controls['username'].valueChanges.subscribe(
      data=>{
        console.log(data);
      })

    this.form2Work.controls['username'].statusChanges.subscribe(
      data => {
        console.log(data);
      })
  }

  addFreetime(){
    (<FormArray>this.form2Work.controls['freetimes']).push(
      new FormControl('Sleep', Validators.required)
    )
  }

  noRamirez(control: FormControl): { [s:string]:boolean} {

    if (control.value === 'ramirez') {
      return {
        noherrera:true
      }
    }
    return null;
  }

  notEqual(control: FormControl): { [s: string]: boolean } {

    let form2workTmp: any = this;

    if (control.value !== form2workTmp.controls['password1'].value) {
      return {
        notequal: true
      }
    }
    return null;
  }

  existusername( control: FormControl): Promise<any>|Observable<any> {

    let promise = new Promise(
      ( resolve, reject )=>{

        setTimeout(() => {
          if (control.value === 'gotham71') {
            resolve( { exists: true })
          }else{
            resolve(null)
          }
        }, 3000);
      }
    )

    return promise;
  }


  save(){
    console.log(this.form2Work.value);
    console.log(this.form2Work);

    // this.form2Work.reset({
    //   fullName:{
    //     name:"",
    //     surname:""
    //   },
    //   email: ""
    // });
  }


}

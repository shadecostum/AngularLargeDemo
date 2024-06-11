import { Component, OnInit } from '@angular/core';
import { AbstractControl, NgForm, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
akash: any;
driver: any;

updateValue($event: string) {
throw new Error('Method not implemented.');
}
viewport: any;
config: any;
ds: any;
products: any[];
customers: any[];
driverLicense: any;
updateValues() {

}


  constructor() { }
  customValidator:any
  ngOnInit() {
  }


  validate(control?: AbstractControl): ValidationErrors | null
  {

    console.log(control,"aaa");
    
    return control
  }


}
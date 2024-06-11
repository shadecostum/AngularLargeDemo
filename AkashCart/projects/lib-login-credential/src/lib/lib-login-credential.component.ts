import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-lib-loginCredential',
  templateUrl:'./lib-login-credential.component.html' ,
  styleUrls: ['./lib-login.component.scss'
  ]
})
export class LibLoginCredentialComponent implements OnInit {


showPopover:boolean=false
userName: any;

loginobj: { userName: string, passwordValid: string } = { userName: '', passwordValid: '' };
  constructor(private route:Router){}
  ngOnInit(): void {
    this.showPopover=true
  }


  
 
  inavalidUser=false

  
  
    closeAlert()
    {
      this.inavalidUser=false
    }
  


materPop:any
    openPopUp($event: MouseEvent) {

const passwordColumnElement = document.getElementById('passwordColumn') ;

      this.materPop=
      {
        'display':'block',
        'position':'absolute',
        'left.px':window.scrollY + passwordColumnElement!.getBoundingClientRect().left,
        'top.px':window.scrollY + passwordColumnElement!.getBoundingClientRect().top +39,
        'background-color':'white'
      }
    }

    closePopUp($event: MouseEvent) 
    {
      this.materPop={'display':'none'}
    }


    passwordValidationFun(password: any)
    {
      console.log("passValidation",password);
      console.log("passValidation",password.length);
      const hasUpperCase= /[A-Z]+/.test(password)
      const hasLowerCase = /[a-z]+/.test(password);
      const hasNumber=/[0-9]/.test(password)
      const specialCharcterCheck=/\W|_/g;
      const specialCharcter=specialCharcterCheck.test(password)

//pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"

      this.passwordValid.hasUppercase=hasUpperCase
      this.passwordValid.hasLowerCase=hasLowerCase
      this. passwordValid.hasNumber=hasNumber
      this. passwordValid.minlength=password.length >= 8 ? true: false
      this.passwordValid.specialCharcter=specialCharcter

    }
    

    passwordValid: {
      hasUppercase: boolean;
      hasLowerCase: boolean;
      hasNumber: boolean;
      minlength: boolean;
      specialCharcter:boolean;
    } = {
      hasUppercase: false,
      hasLowerCase: false,
      hasNumber: false,
      minlength: false,
      specialCharcter:false
    };


    areAllCriteriaSatisfied(): boolean {
    
      return this.passwordValid.hasLowerCase &&
       this.passwordValid.hasUppercase && 
       this.passwordValid.hasNumber && 
       this.passwordValid.minlength &&
       this.passwordValid.specialCharcter;
  }



}

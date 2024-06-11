import { NgModule } from '@angular/core';
import { LibLoginCredentialComponent } from './lib-login-credential.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes:Routes=[
{path:'',component:LibLoginCredentialComponent}
];

@NgModule({
  declarations: [
    LibLoginCredentialComponent,
    
  ],
  imports: [FormsModule, CommonModule , RouterModule.forChild(routes)
  ],
  exports: [
    LibLoginCredentialComponent
  ]
})
export class LibLoginCredentialModule { }

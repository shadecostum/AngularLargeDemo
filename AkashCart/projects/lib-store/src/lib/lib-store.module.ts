import {  NgModule } from '@angular/core';
import { HomeComponent } from './StoreJourney/@Components/home/home.component';
import { AddProductComponent } from './StoreJourney/@Components/home/Add-Product/Add-Product.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { TableModule } from 'primeng/table';  
import { CalendarModule } from 'primeng/calendar';
import { LibSharedModule } from 'projects/lib-shared/src/public-api';
import { SelectNgformthreeOneComponent } from './StoreJourney/@Components/SelectNgformthreeOne/SelectNgformthreeOne.component';




const routes:Routes=[
  {
    path:'',
  component:HomeComponent
  }
]



@NgModule({
  declarations: [
    HomeComponent,
    AddProductComponent,
    SelectNgformthreeOneComponent

    
   
 
  ],
  imports: [
   LibSharedModule,
    HttpClientModule,
    FormsModule,
    CalendarModule,
    TableModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
  ]
})
export class LibStoreModule { }

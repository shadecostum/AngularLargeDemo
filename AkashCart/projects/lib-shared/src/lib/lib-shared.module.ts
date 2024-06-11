import { NgModule } from '@angular/core';
import { LibSharedComponent } from './lib-shared.component';
import { CalendarModule } from 'primeng/calendar';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AkCalenderComponent } from './@components/ak-calender/ak-calender.component';
import { AkInputComponent } from './@components/ak-input/ak-input.component';
import { AkSelectComponent } from './@components/ak-select/ak-select.component';
import { AkIconComponent } from './@components/ak-icon/ak-icon.component';

const Components: any = [AkCalenderComponent,AkInputComponent,AkSelectComponent,AkIconComponent]

@NgModule({
  declarations: [
    LibSharedComponent,...Components
  ],
  imports: [
    CalendarModule,
    HttpClientModule,
    FormsModule,
    CalendarModule,
  
    
    
    CommonModule,
  ],
  exports: [
    ...Components
   


  ]
})
export class LibSharedModule { }

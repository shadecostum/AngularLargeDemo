import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ak-icon',
  templateUrl: './ak-icon.component.html',
  styleUrls: ['./ak-icon.component.css']
})
export class AkIconComponent implements OnInit {

 

  ngOnInit() {
  }

  @Input('iconStyle') iconStyle?:
    | 'fa-regular'
    | 'fa-light'
    | 'fa-solid'
    | 'fa-duotone'
    | 'fa-thin';
  direction!: string;
  @Input('icon') icon: string = '';
  @Input('rtlIcon') rtlIcon: string = '';
  @Input('styleClasses') styleClasses?: string = '';

  // constructor(private appSettingService: AppSettingService) {
  //   if (!this.iconStyle) {
  //     this.iconStyle = 'fa-light';
  //     this.appSettingService
  //       .getAppSetting()
  //       .subscribe((appSetting: AppSetting) => {
  //         this.iconStyle = appSetting.iconStyle;
  //       });
  //     this.appSettingService
  //       .getExtraSettingSubject()
  //       .subscribe((extraSetting: ExtraSetting) => {
  //         this.direction = extraSetting.direction;
  //       });
  //   }
  // }


}

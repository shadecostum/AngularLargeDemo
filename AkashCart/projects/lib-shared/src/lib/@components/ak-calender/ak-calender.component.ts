import { Component, EventEmitter, HostBinding,  Input,  OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Calendar, CalendarTypeView } from 'primeng/calendar';

@Component({
  selector: 'app-ak-calender',
  templateUrl: './ak-calender.component.html',
  styleUrls: ['./ak-calender.component.scss']
})
export class AkCalenderComponent implements OnInit {

  date2: any;



  direction: string = '';

  @HostBinding('attr.style')
  value?: string = '';

  @ViewChild('calender') calender!: Calendar;

  showCalender(event: any) {
    if (!this.isDisabled && !this.readonly) {
      this.calender.toggle();
      event?.stopPropagation();
    }
  }
  /*https://primefaces.org/primeng/showcase/#/calendar*/
  //required
  @Input() id!: string;
  @Input() name!: string;
  @Input() label!: string;

  @Input('style') style: string = 'style1';
  @Input('isStyleChange') isStyleChange: boolean = true;
  @Input('showTime') showTime: boolean = false;
  @Input('hourFormat') hourFormat: string = '24';
  @Input('showIcon') showIcon: boolean = true;
  @Input('dateFormat') dateFormat: string = 'dd-M-yy';
  @Input('selectOtherMonths') selectOtherMonths: boolean = true;
  @Input('monthNavigator') monthNavigator: boolean = false;
  @Input('yearNavigator') yearNavigator: boolean = false;
  @Input('yearRange') yearRange: string = '2000:2030';
  @Input('timeOnly') timeOnly: boolean = false;
  @Input('showOtherMonths') showOtherMonths: boolean = false;
  @Input('dataType') dataType: string = 'string';
  @Input('iconClasses') iconClasses: string = '';
  @Input('view') view: CalendarTypeView = 'date';
  @Input('defaultDate') defaultDate: any = null;
  @Input('minDate') minDate: any = null;
  @Input('maxDate') maxDate: any = null;
  // @Input() inputId?: string = '';
  @Input() numberOfMonths: number = 1;
  @Input() selectionMode: string = 'single';
  @Input() hideOnDateTimeSelect: boolean = true;

  //optional

  @Input() helpText?: string;
  @Input() customErrorMessage: string = '';
  errorMessage!: string; // = 'This Field is Required';

  @Input() showLabel: boolean = true;
  @Input() showActionIcons: boolean = true;
  @Input() showClear: boolean = true;
  @Input() required: boolean = false;
  @Input() readonly: boolean = false;
  @Input() error: boolean = false;

  @Output() focus = new EventEmitter<Event>();
  @Output() focusout = new EventEmitter<Event>();
  @Output() blur = new EventEmitter<Event>();
  @Output() onRightIcon = new EventEmitter<void>();
  @Output() change = new EventEmitter<any>();

  isDisabled = false;

  onChange: any = (value: string) => {};

  onTouched: any = () => {};

  constructor(
   
  ) {
    // this.appSettingService
    //   .getAppSetting()
    //   .subscribe((appSetting: AppSetting) => {
    //     this.style = appSetting.formControlStyle;
    //   });
    // this.appSettingService
    //   .getExtraSettingSubject()
    //   .subscribe((extraSetting: ExtraSetting) => {
    //     this.direction = extraSetting.direction;
    //   });
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.minDate) {
      this.minDate = new Date(this.minDate);
    }
    if (this.maxDate) {
      this.maxDate = new Date(this.maxDate);
    }
  }

  onRightIconClick() {
    this.onRightIcon.emit();
  }

  touched() {
    this.onTouched();
    this.validate();
  }

  changed(value: any): void {
    this.onChange(value);

    this.change.emit(value);

    this.value = value;
    this.validate();

    this.onFocusOut();

    if (this.selectionMode == 'range' && value[0] && value[1]) {
      this.calender.hideOverlay();
    }
  }

  onFocus(event: Event): void {
    this.focus.emit(event);
  }

  onBlur(event: Event): void {
    this.touched();
    this.blur.emit(event);
  }

  onFocusOut(event?: Event): void {
    this.focusout.emit(event);
  }

  validate() {
    setTimeout(() => {
      this.errorMessage = '';

      if (this.required) {
        if (!this.value) {
          this.errorMessage =
            (this.label ? this.label : 'This field') + ' is required';
        }
      }

      if (this.customErrorMessage) {
        this.errorMessage = this.customErrorMessage;
      }
    }, 100);
  }

  onInput(e: any) {
    e.preventDefault();
    e.stopPropagation();
  }

  clearInput(): void {
    this.value = '';
    this.onChange(this.value);
    this.change.emit('');
    this.validate();
  }

  writeValue(value: string): void {
    this.value = value ? value : '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

}

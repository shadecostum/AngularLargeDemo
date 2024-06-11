import {
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
  SimpleChanges,
  Injector,
  Inject,
  ChangeDetectorRef,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgModel,
  ValidationErrors,
} from '@angular/forms';
@Component({
  selector: 'app-ak-input',
  templateUrl: './ak-input.component.html',
  styleUrls: ['./ak-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AkInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AkInputComponent),
      multi: true,
    },
    {
      provide: NgControl,
      useExisting: forwardRef(() => AkInputComponent),
      multi: true,
    },
  ]
})
export class AkInputComponent implements OnInit, OnChanges, ControlValueAccessor {

  @ViewChild('inputField') inputField!: any;

  direction: string = '';

  restrictedWords: string[] = [];

  @HostBinding('attr.style')
  style: string = '';
  @Input() value?: string = '';

  //required
  @Input() id!: string;
  @Input() name!: string;
  @Input() label!: string;

  //optional
  @Input('type') type?: string = 'text';
  @Input('inputType') inputType:
    | 'pattern'
    | 'checkbox'
    | 'normal'
    | 'numeric'
    | 'email'
    | 'alphaNumeric'
    | 'noSpaceAlphaNumeric'
    | 'noSpace'
    | 'cardNumber'
    | 'decimalFormat'
    | 'currencyformatter' = 'normal';
  @Input('validationType') validationType?:
    | 'pincode'
    | 'feedback'
    | 'accountNo'
    | 'address'
    | 'name'
    | 'email'
    | 'faxNo'
    | 'code';
    @Input() isShowZeroAmount: boolean;
  @Input() minLength?: number;
  @Input() maxLength?: number;
  @Input() min?: number;
  @Input() max?: number;
  @Input() icon?: string;
  @Input() helpText?: string;
  @Input() toolTip?: string;
  errorMessage!: string; // = 'This field is Required';
  @Input() showLabel: boolean = true;
  @Input() showClear: boolean = true;
  @Input() showError: boolean = true;
  @Input() rightIcon!: string;
  @Input() rightLabel!: string;
  @Input() required: boolean = false;
  @Input() readonly: boolean = false;
  @Input() error: boolean = false;
  @Input() autofocus: boolean = false;
  @Input() customMinMaxErrorMessage: string = '';
  @Input() customErrorMessage: string = '';
  @Input() pattern?: any;

  @Input() regex!: string;
  @Input() digit!: number;
  @Input() decimal!: number;
  @Input() currencyCode!: string;
  @Input() allowZero?: boolean;
  @Input() zeroAfterDecimal?: boolean;

  @Input() textAlign: 'left' | 'right' = 'right'; // for currencyformatter

  @Output() focus = new EventEmitter<Event>();
  @Output() focusout = new EventEmitter<Event>();
  @Output() blur = new EventEmitter<Event>();
  @Output() onInput = new EventEmitter<string>();
  @Output() onRightIcon = new EventEmitter<void>();
  @Output() onClear = new EventEmitter<void>();

  @Output() onErrorMessageChange = new EventEmitter<string>();

  private isFocused: boolean = false;

  @Input() disabled = false;

  //add class
  @Input() addClass!: string;

  public control!: FormControl;

  onChange: any = (value: string) => {};

  onTouched: any = () => {};
  isCommercial:boolean=false;

  constructor(

    private cdRef: ChangeDetectorRef,
    @Inject(Injector) private injector: Injector
  ) {

  }

  ngOnInit(): void {
    this.setComponentControl();
   

    if (this.rightIcon == 'fa-search' && (this.readonly || this.disabled)) {
      this.showClear = false;
    } else if (this.readonly || this.disabled) {
      this.showClear = false;
    } else if (this.inputType == 'currencyformatter') {
      this.showClear = false;
    }

    if (
      ![
        'normal',
        'numeric',
        'email',
        'alphaNumeric',
        'noSpaceAlphaNumeric',
        'noSpace',
        'decimalFormat',
        'currencyformatter',
        'cardNumber',
      ].includes(this.inputType)
    ) {
      this.inputType = 'normal';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      ((changes['value'] && !changes['value']?.firstChange) ||
        changes['customErrorMessage']) &&
      this.control
    ) {
      // console.log(this.control);

      this.validate(this.control);
    }
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  private setComponentControl(): void {
    const injectedControl = this.injector.get(NgControl);

    switch (injectedControl.constructor) {
      case NgModel: {
        const { control, update } = injectedControl as NgModel;

        this.control = control;

        break;
      }

      default: {
        this.control = (injectedControl as FormControlDirective)
          .form as FormControl;

        break;
      }
    }
  }



  onRightIconClick() {
    this.onRightIcon.emit();
  }

  touched() {
    this.onTouched();
    this.validate(this.control);
  }

  changed(event: Event): void {
    const value: string = (<HTMLInputElement>event.target).value;

    this.onChange(value);

    this.onInput.emit(value);

    this.value = value;
    // this.validate();
  }

  onFocus(event: Event): void {
    if (!this.isFocused) {
      this.focus.emit(event);
    }
  }

  onFocusOut(event: Event): void {
    if (this.isFocused) {
      this.focusout.emit(event);
      this.isFocused = false;
      // this.validate();
    }
  }

  onBlur(event: Event): void {
    this.blur.emit(event);
  }






  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  validate(control?: AbstractControl): ValidationErrors | null {
    this.error = false;
    // console.log(control);

    this.control.setErrors(null);

    if (!(control?.dirty || control?.touched)) {
      return null;
    }

    if (
      (control?.dirty || control?.touched) &&
      !control.value &&
      this.inputType == 'currencyformatter' &&
      this.allowZero
    ) {
    }
    if (
      this.inputType == 'currencyformatter' &&
      this.max &&
      +control.value > this.max
    ) {
      if (this.customMinMaxErrorMessage) {
        this.errorMessage = this.customMinMaxErrorMessage;
      }
      if (this.customErrorMessage) {
        this.errorMessage = this.customErrorMessage;
      } else {
        this.errorMessage = 'Value should be below or equal to ' + this.max;
      }
      return this.getError();
    }

    if (
      this.inputType == 'currencyformatter' &&
      this.min &&
      +control.value < this.min
    ) {
      if (this.customMinMaxErrorMessage) {
        this.errorMessage = this.customMinMaxErrorMessage;
      } else {
        this.errorMessage = 'Value should be above or equal to ' + this.min;
      }
      return this.getError();
    }

    if (
      this.inputType == 'currencyformatter' &&
      this.max &&
      +control.value > this.max
    ) {
      if (this.customMinMaxErrorMessage) {
        this.errorMessage = this.customMinMaxErrorMessage;
      } else {
        this.errorMessage = 'Value should be below or equal to ' + this.max;
      }
      return this.getError();
    }

    if (
      this.inputType == 'currencyformatter' &&
      this.min &&
      +control.value < this.min
    ) {
      if (this.customMinMaxErrorMessage) {
        this.errorMessage = this.customMinMaxErrorMessage;
      } else {
        this.errorMessage = 'Value should be above or equal to ' + this.min;
      }
      return this.getError();
    }

    if (this.required) {
      // setTimeout(() => {
      if (!control.value) {
        this.errorMessage =
          (this.label ? this.label : 'This field') + ' is required';
        this.error = true;
        return this.getError();
      } else if (
        this.inputType == 'currencyformatter' &&
        +control.value == 0 &&
        !this.allowZero
      ) {
        this.value = '';
        this.errorMessage =
          (this.label ? this.label : 'This field') + ' is required';
        this.error = true;
        return this.getError();
      } else if (this.inputType == 'email') {
        const regExp: RegExp = new RegExp(
          /^\w+([-.]\w+)*@\w+([-.]\w+)*\.\w{2,4}$/
        );

        if (!regExp.test(control.value)) {
          this.error = true;
          this.errorMessage = this.customErrorMessage || 'Invalid Email';
          return this.getError();
        }
      } else if (this.customErrorMessage) {
        this.errorMessage = this.customErrorMessage;
        return this.getError();
      }

      this.errorMessage = '';
    }

    // console.log("reached");

    if (
      this.validationType 
    ) {
      this.errorMessage = 'Special characters not allowed';
      return this.getError();
    }

    if (this.isCheckRestrictedWord(control.value)) {
      this.errorMessage = 'Restricted keyword not allowed';
      return this.getError();
    }

    if (this.customErrorMessage) {
      this.errorMessage = this.customErrorMessage;
      this.getError();
    }


    //checking the length 
    let length = control.value?.length || 0;
    if (this.inputType == 'currencyformatter' && control.value)
      length = control.value.replaceAll(',', '').length;
    if (
      this.minLength &&
      this.maxLength &&
      this.minLength == this.maxLength && length != this.maxLength
    ) {
      this.errorMessage =
        'Please Enter Exact of ' + this.maxLength + ' Characters';
      return this.getError();
    }

    if (control.value) {
      if (this.maxLength && length > this.maxLength) {
        this.errorMessage =
          'Please Enter Maximum of ' + this.maxLength + ' Characters';
        return this.getError();
      }

      if (this.minLength && length < this.minLength) {
        this.errorMessage =
          'Please Enter Minimum of ' + this.minLength + ' Characters';
        return this.getError();
      }

      if (this.inputType === 'decimalFormat') {
        const value = control?.value;

        // console.log("valr",value);

        if (value) {
          const decimalRegex = new RegExp(`^\\d*(\\.\\d{0,${this.decimal}})?$`);

          if (!decimalRegex.test(value)) {
            this.errorMessage = 'Invalid Decimal Number';
            return this.getError();
          }
        }
      }
      if (
        this.inputType == 'decimalFormat' &&
        this.max &&
        +control.value > this.max
      ) {
        if (this.customMinMaxErrorMessage) {
          this.errorMessage = this.customMinMaxErrorMessage;
        } else {
          this.errorMessage = 'Value should be below or equal to ' + this.max;
        }
        return this.getError();
      }

      if (
        this.inputType == 'decimalFormat' &&
        this.min &&
        +control.value < this.min
      ) {
        if (this.customMinMaxErrorMessage) {
          this.errorMessage = this.customMinMaxErrorMessage;
        } else {
          this.errorMessage = 'Value should be above or equal to ' + this.min;
        }
        return this.getError();
      }

      if (
        this.inputType == 'numeric' &&
        this.max &&
        +control.value > this.max
      ) {
        if (this.customMinMaxErrorMessage) {
          this.errorMessage = this.customMinMaxErrorMessage;
        } else {
          this.errorMessage = 'Value should be below or equal to ' + this.max;
        }
        return this.getError();
      }

      if (
        this.inputType == 'numeric' &&
        this.min &&
        +control.value < this.min
      ) {
        if (this.customMinMaxErrorMessage) {
          this.errorMessage = this.customMinMaxErrorMessage;
        } else {
          this.errorMessage = 'Value should be above or equal to ' + this.min;
        }
        return this.getError();
      }

      if (this.inputType == 'email') {
        const regExp: RegExp = new RegExp(
          /^\w+([-.]\w+)*@\w+([-.]\w+)*\.\w{2,4}$/
        );

        if (!regExp.test(control.value)) {
          this.error = true;
          this.errorMessage = this.customErrorMessage || 'Invalid Email';
          return this.getError();
        }
      }

      if (this.pattern) {
        const regExp: RegExp = new RegExp(this.pattern);

        if (!regExp.test(control.value)) {
          this.errorMessage =
            (this.label ? this.label : 'This field') + ' format is not correct';
          this.errorMessage = this.customErrorMessage || this.errorMessage;
          return this.getError();
        }
      }
    }
    this.errorMessage = '';
    // }, 100);

    return this.getError();
  }




















  isCheckRestrictedWord(value: string): boolean {
    let isCheck: boolean = false;

    this.restrictedWords.forEach((word: string) => {
      if (value.includes(word)) {
        isCheck = true;
      }
    });

    return isCheck;
  }

  getError() {
    const error: any = this.errorMessage
      ? { [this.errorMessage.replaceAll(' ', '')]: true }
      : null;

    this.control.setErrors(error);
    this.onErrorMessageChange.emit(this.errorMessage);
    return error;
  }

  get invalid() {
    return !!this.errorMessage;
  }

  clearInput(): void {
    this.value = '';
    this.onClear.emit();
    this.onChange(this.value);
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
    this.disabled = isDisabled;
  }

}

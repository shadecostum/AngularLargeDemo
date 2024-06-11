import {  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild, } from '@angular/core';
  import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
  import { Dropdown } from 'primeng/dropdown';
  import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-ak-select',
  templateUrl: './ak-select.component.html',
  styleUrls: ['./ak-select.component.css']
})
export class AkSelectComponent implements OnInit, OnChanges, ControlValueAccessor {

  @ViewChild('dropdown') dropdown!: Dropdown;

  @Input('readonly') readonly: boolean = false;
  @Input('showLabel') showLabel: boolean = true;
  @Input('showClear') showClear: boolean = false;
  @Input('disabled') isDisabled: boolean = false;
  @Input('isRadioButtonView') isRadioButtonView: boolean = false;
  @Input('backgroundStyle') backgroundStyle: string = 'normal'; // normal, primary
  @Input('isRadioStyleVertical') isRadioStyleVertical: boolean = false;

  @Input('icon') icon?: string;
  @Input('reqBody') reqBody?: any;
  @Input('dataUrl') dataUrl?: string;
  @Input('productContext') productContext?: any;
  @Input('helpText') helpText?: string;
  @Input('showDelete') showDelete?: boolean;
  @Input('errorMessage') errorMessage?: string = 'This Field is Required';
  @Input('customErrorMessage') customErrorMessage?: string = '';
  @Input('isLoadUrlData') isLoadUrlData?: boolean = true;
  @Input('preSelectFirstOption') preSelectFirstOption?: boolean = false;
  @Input('confirmMsgToChange') confirmMsgToChange?: String = '';
  @Input('displayNameToSetId') displayNameToSetId?: String = '';
  @Input('filter') filter: boolean = true;
  @Input('loadingUrlData') loadingUrlData: boolean | undefined = false;

  @Input('id') id!: string;
  @Input('value') val!: any;
  @Input('name') name!: string;
  @Input('data') data!: any[];
  @Input('label') label!: string;
  @Input('required') required!: boolean;
  @Input('colorClass') colorClass!: string;

  @Output('focusout') focusout = new EventEmitter<Event>();
  @Output('onUrlDataPrepared') onUrlDataPrepared = new EventEmitter<any>();
  @Output('getDataList') getDataList = new EventEmitter<any>();
  @Output('change') change = new EventEmitter<any>();
  @Output('clearDisplayNameToSetId') clearDisplayNameToSetId =
    new EventEmitter<any>();
  @Output('autoChange') autoChange = new EventEmitter<any>();
  @Output('clearSelection') clearSelection = new EventEmitter<any>();
  @Output() closeDropdownEvent = new EventEmitter<void>();

  fromUISelection: boolean = false;
  loadingOptions: boolean = false;
  showOptions: boolean = false;
  isHover: boolean = false;
  class: string = 'select-control';
  displayName: string = '';
  direction: string = '';
  @Input('emptyMessage') emptyMessage: string = 'Loading...';
  elementId!: string;
  style!: string;
  error!: any;
  onChange: any = (val: any) => {};
  onTouched: any = () => {};
  confirmSubject!: Subject<boolean>;
  confirmMessage!: string;
  confirmBtnCaption!: string;
  isOpenConfirm!: boolean;
  tempVal: any = null;

  get value() {
    return this.val;
  }

  set value(val) {
    this.val = val;
    this.onChange(val);
    this.optionDataCheck();
  }

  optionDataCheck() {
    const d = this.data
      ? this.data.find((dt: any) => dt.id === this.val)
      : '';
    this.displayName = d ? d.displayName : '';
    if (this.fromUISelection) {
      this.change.emit(d);
      this.fromUISelection = false;
    }
    if (!!this.displayNameToSetId) this.autoChange.emit(d);
    this.onTouched();
    this.validate();
  }

  constructor(

    private cdRef: ChangeDetectorRef,

  ) {


  }

  ngOnInit(): void {
    this.colorClass = this.colorClass ? this.colorClass : '';
    this.class = this.class + ' ' + this.colorClass;

    if (!this.data && !this.dataUrl) {
      this.data = [];
      if (!this.loadingUrlData) {
        this.emptyMessage = 'No Records Found';
      }
    } else {
      // this.getUrlData();
    }

    if (!this.val || this.val === undefined) {
      this.val = '';
      this.displayName = '';
    } else {
      const d = this.data
      //select applied here
        ? this.data.find((dt: any) => dt.id === this.val)
        : '';
      this.displayName = d ? d.displayName : '';
    }

    this.elementId =
      (this.id ? this.id : this.name ? this.name : '' + new Date().getTime()) +
      (this.label ? (this.label ? this.label.replace(' ', '_') : '') : '');

    if (this.required !== false && this.required !== undefined) {
      this.required = true;
    }

    this.errorMessage =
      (this.label ? this.label : 'This field') + ' is required';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['val']?.firstChange) {
      return;
    }

    if (!this.val || this.val === undefined) {
      this.val = '';
      this.displayName = '';
    } else {
      this.optionDataCheck();
    }

    if (
      changes['customErrorMessage'] &&
      changes['customErrorMessage']?.currentValue
    ) {
      this.errorMessage = this.customErrorMessage;
      this.error = true;
    } else if (
      changes['customErrorMessage'] &&
      !changes['customErrorMessage']?.currentValue
    ) {
      this.errorMessage = this.customErrorMessage;
      this.error = false;
    }

    if (
      changes['customErrorMessage'] &&
      changes['isLoadUrlData'] &&
      !changes['isLoadUrlData']?.currentValue
    ) {
      this.data = [];
    }

    if (
      changes['reqBody'] ||
      (changes['isLoadUrlData'] && changes['isLoadUrlData']?.currentValue) ||
      (!this.fromUISelection && (!this.data || this.data?.length == 0))
    ) {
      // this.getUrlData();
    } else if (changes['displayNameToSetId']) {
      if (
        changes['reqBody'] ||
        changes['isLoadUrlData'] ||
        !this.data ||
        this.data?.length == 0
      ) {
        // this.getUrlData();
      } else if (!this.loadingOptions) {
        this.setIdByDisplayName();
      }
    }
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  onClearSelection() {
    this.value = '';
    this.clearSelection.emit();
  }

  private setIdByDisplayName() {
    this.data = this.data ? this.data : [];

    if (this.displayNameToSetId && this.data.length != 0) {
      const d = this.data
        ? this.data.find(
            (dt: any) => dt.displayName === this.displayNameToSetId
          )
        : '';
      if (d) {
        this.value = d.id;
      } else {
        this.val = '';
        this.displayName = '';
      }
      this.displayNameToSetId = '';
      this.clearDisplayNameToSetId.emit(this.displayNameToSetId);
    }
  }

  confirmDropDownToBeChange(value: any) {
    this.showConfirmModal(this.confirmMsgToChange + '', 'Confirm').subscribe(
      (isConfirm: boolean) => {
        if (isConfirm) {
          this.fromUISelection = true;
          this.value = value;
          this.showOptions = false;
        }
      }
    );
  }

  /* Confirmation Modal Start */
  showConfirmModal(
    confirmMessage: string,
    confirmBtnCaption?: string
  ): Observable<boolean> {
    this.confirmSubject = new Subject<boolean>();
    this.confirmMessage = confirmMessage;
    this.confirmBtnCaption = confirmBtnCaption ? confirmBtnCaption : '';
    this.isOpenConfirm = true;
    return this.confirmSubject.asObservable();
  }

  onConfirm(isConfirm: boolean) {
    this.confirmSubject.next(isConfirm);
    this.confirmSubject.complete();
  }
  /* Confirmation Modal End */
  handleModalClose() {
    // Hide the dropdown when the modal closes
    this.closeDropdown();
  }

  toggleDropdown(event: any) {
    // if (
    //   this.dropdown.disabled ||
    //   this.dropdown.readonly ||
    //   this.dropdown.isInputClick(event)
    // ) {
    //   return;
    // }
    //   event?.stopPropagation();
    //   event?.preventDefault();
    // this.dropdown.onClick.emit(event);
    // this.dropdown.accessibleViewChild.nativeElement.focus();

    if (this.dropdown.overlayVisible) {
      //this.dropdown.documentClickListener = null;
      this.dropdown.hide();
    } else {
      //this.dropdown.documentClickListener = () => {};
      this.dropdown.show();
    }
    this.dropdown.cd.detectChanges();
  }

  showDropdown(event: any) {
    if (
      this.dropdown.disabled ||
      this.dropdown.readonly ||
      this.dropdown.isInputClick(event) ||
      this.dropdown.overlayVisible
    ) {
      return;
    }
    event?.stopPropagation();
    event?.preventDefault();
    this.dropdown.onClick.emit(event);
    this.dropdown.accessibleViewChild.nativeElement.focus();
    this.dropdown.show();
    this.dropdown.cd.detectChanges();
  }

  hideDropdown(event: any) {
    if (
      this.dropdown.disabled ||
      this.dropdown.readonly ||
      this.dropdown.isInputClick(event) ||
      this.dropdown.overlayVisible
    ) {
      return;
    }
    event?.stopPropagation();
    event?.preventDefault();
    this.dropdown.onClick.emit(event);
    this.dropdown.accessibleViewChild.nativeElement.focus();

    this.dropdown.cd.detectChanges();
    this.dropdown.hide();
    this.focusout.emit(event);

    //this.dropdown.documentClickListener = null;
  }

  onHideDropdown() {
    if (this.tempVal) {
      this.onOptionSelect(this.tempVal);
      this.tempVal = null;
    }
    this.validate();
  }

  // onClickDropdown(event: any) {
  //   const selectElement: any = document.getElementById(this.elementId);

  //   setTimeout(() => {
  //     selectElement.focus();
  //   }, 0);
  // }

  // getUrlData() {
  //   if (this.isLoadUrlData && this.productContext && this.dataUrl) {
  //     this.emptyMessage = 'Loading...';

  //     if (!this.loadingOptions) {
  //       // this.loadingOptions = true;

  //       const data = this.reqBody ? this.reqBody : {};

  //       let selectedRecord!: any;

  //       this.httpService
  //         .httpPost(this.productContext, this.dataUrl, data, true)
  //         .subscribe((res: any) => {
  //           if (res.responseStatus.status != '0') {
  //             this.toasterService.showToaster({
  //               severity: 'error',
  //               detail: res.responseStatus.message,
  //             });
  //           } else {
  //             this.data = res && res.dataList ? res.dataList : [];

  //             const d = this.data
  //               ? this.data.find((dt: Select) => dt.id === this.val)
  //               : '';

  //             selectedRecord = d;
  //             if (d) {
  //               this.displayName = d.displayName;
  //             } else if (
  //               (this.data.length == 1 && this.required) ||
  //               (this.preSelectFirstOption && this.data.length > 0)
  //             ) {
  //               selectedRecord = this.data[0];
  //               this.value = selectedRecord.id;
  //               this.displayName = selectedRecord.displayName;
  //               this.change.emit(selectedRecord);
  //               setTimeout(() => {
  //                 this.val = selectedRecord.id;
  //               }, 10);
  //             } else {
  //               this.val = '';
  //               this.displayName = '';
  //             }

  //             this.loadingOptions = false;

  //             if (!!this.displayNameToSetId) this.setIdByDisplayName();
  //           }

  //           this.onUrlDataPrepared.emit(selectedRecord);
  //           this.getDataList.emit(this.data);

  //           this.loadingUrlData = false;

  //           this.emptyMessage = 'No Records Found';
  //         });
  //     }
  //   } else {
  //     this.data = this.data ? this.data : [];

  //     if (this.val) {
  //       const d = this.data
  //         ? this.data.find((dt: Select) => dt.id === this.val)
  //         : '';
  //       if (d) {
  //         this.displayName = d.displayName;
  //       } else {
  //         this.val = '';
  //         this.displayName = '';
  //       }
  //     } else if (
  //       (this.data.length == 1 && this.required) ||
  //       (this.preSelectFirstOption && this.data.length > 0)
  //     ) {
  //       this.value = this.data[0]?.id;
  //       this.change.emit(this.data[0]);
  //     }
  //     if (!!this.displayNameToSetId) this.setIdByDisplayName();

  //     if (!this.loadingUrlData) {
  //       this.emptyMessage = 'No Records Found';
  //     }
  //   }
  // }

  onOptionChange(value: any) {
    this.tempVal = value;
  }

  onOptionSelect(value: any) {
    if (!!this.confirmMsgToChange) {
      this.confirmDropDownToBeChange(value);
    } else {
      this.fromUISelection = true;
      this.value = value;
      this.showOptions = false;
    }
  }
  closeDropdown() {
    this.dropdown.hide();
  }

  emitCloseDropdownEvent() {
    this.closeDropdownEvent.emit();
  }

  touched() {
    this.validate();
  }

  validate() {
    if (this.required) {
      if (!this.value) {
        this.error = true;
        return;
      }
      this.error = false;
    }
  }

  getDataByValue(value: any): any | null {
    const d: any | undefined = this.data.find(
      (dt: any) => dt.id === value
    );
    return d ? d : null;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value: any) {
    if (value) {
      this.value = value;
    }
  }
}

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AkInputComponent } from './ak-input.component';

describe('AkInputComponent', () => {
  let component: AkInputComponent;
  let fixture: ComponentFixture<AkInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AkInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

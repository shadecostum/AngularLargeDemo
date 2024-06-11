/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AkIconComponent } from './ak-icon.component';

describe('AkIconComponent', () => {
  let component: AkIconComponent;
  let fixture: ComponentFixture<AkIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AkIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

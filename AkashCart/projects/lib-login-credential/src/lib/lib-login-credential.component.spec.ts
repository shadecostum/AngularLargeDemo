import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibLoginCredentialComponent } from './lib-login-credential.component';

describe('LibLoginCredentialComponent', () => {
  let component: LibLoginCredentialComponent;
  let fixture: ComponentFixture<LibLoginCredentialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibLoginCredentialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibLoginCredentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

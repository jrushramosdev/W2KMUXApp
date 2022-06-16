import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpvManagementComponent } from './ppv-management.component';

describe('PpvManagementComponent', () => {
  let component: PpvManagementComponent;
  let fixture: ComponentFixture<PpvManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PpvManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PpvManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

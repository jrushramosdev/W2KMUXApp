import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowManagementComponent } from './show-management.component';

describe('ShowManagementComponent', () => {
  let component: ShowManagementComponent;
  let fixture: ComponentFixture<ShowManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

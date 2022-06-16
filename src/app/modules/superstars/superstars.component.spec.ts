import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperstarsComponent } from './superstars.component';

describe('SuperstarsComponent', () => {
  let component: SuperstarsComponent;
  let fixture: ComponentFixture<SuperstarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperstarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperstarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

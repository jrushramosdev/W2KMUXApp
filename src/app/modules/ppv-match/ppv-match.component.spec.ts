import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpvMatchComponent } from './ppv-match.component';

describe('PpvMatchComponent', () => {
  let component: PpvMatchComponent;
  let fixture: ComponentFixture<PpvMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PpvMatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PpvMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

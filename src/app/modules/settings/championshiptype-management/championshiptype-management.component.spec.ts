import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionshiptypeManagementComponent } from './championshiptype-management.component';

describe('ChampionshiptypeManagementComponent', () => {
  let component: ChampionshiptypeManagementComponent;
  let fixture: ComponentFixture<ChampionshiptypeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampionshiptypeManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampionshiptypeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

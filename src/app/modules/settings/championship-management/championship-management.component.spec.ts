import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionshipManagementComponent } from './championship-management.component';

describe('ChampionshipManagementComponent', () => {
  let component: ChampionshipManagementComponent;
  let fixture: ComponentFixture<ChampionshipManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampionshipManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampionshipManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

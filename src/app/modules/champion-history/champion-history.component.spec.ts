import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionHistoryComponent } from './champion-history.component';

describe('ChampionHistoryComponent', () => {
  let component: ChampionHistoryComponent;
  let fixture: ComponentFixture<ChampionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampionHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

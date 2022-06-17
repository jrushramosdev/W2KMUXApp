import { Component, OnInit } from '@angular/core';
import { ChampionshipManagementService } from '../../shared/services/championship-management.service';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.scss']
})
export class ChampionsComponent implements OnInit {

  public champion: Array<any> = [];

  constructor(private championsService: ChampionshipManagementService) { }

  ngOnInit(): void {
    this.champion = this.championsService.getChampion()
    console.log(this.champion)
  }

}

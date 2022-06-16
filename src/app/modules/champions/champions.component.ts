import { Component, OnInit } from '@angular/core';
import { ChampionsService } from '../../shared/services/champions.service';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.scss']
})
export class ChampionsComponent implements OnInit {

  public champion: Array<any> = [];

  constructor(private championsService: ChampionsService) { }

  ngOnInit(): void {
    this.champion = this.championsService.getChampion()
    console.log(this.champion)
  }

}

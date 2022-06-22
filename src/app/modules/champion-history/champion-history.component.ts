import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-champion-history',
  templateUrl: './champion-history.component.html',
  styleUrls: ['./champion-history.component.scss']
})
export class ChampionHistoryComponent implements OnInit {

  public championshipList: Array<any> = [
    {
      championshipName: "WWE Champion",
      championsList: [
        {
          superstarName: "Triple H",
          ppvName: "Wrestlemania 32",
          reignCount: 4
        },
        {
          superstarName: "Triple H",
          ppvName: "Wrestlemania 32",
          reignCount: 4
        },
        {
          superstarName: "Triple H",
          ppvName: "Wrestlemania 32",
          reignCount: 4
        },
        {
          superstarName: "Triple H",
          ppvName: "Wrestlemania 32",
          reignCount: 4
        },
        {
          superstarName: "Triple H",
          ppvName: "Wrestlemania 32",
          reignCount: 4
        },
      ]
    },
    {
      championshipName: "United State Champion",
      championsList: [
        {
          superstarName: "Triple H",
          ppvName: "Wrestlemania 32",
          reignCount: 4
        },
        {
          superstarName: "Triple H",
          ppvName: "Wrestlemania 32",
          reignCount: 4
        },
        {
          superstarName: "Triple H",
          ppvName: "Wrestlemania 32",
          reignCount: 4
        },
        {
          superstarName: "Triple H",
          ppvName: "Wrestlemania 32",
          reignCount: 4
        },
        {
          superstarName: "Triple H",
          ppvName: "Wrestlemania 32",
          reignCount: 4
        },
      ]
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

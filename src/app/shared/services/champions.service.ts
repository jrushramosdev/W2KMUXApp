import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChampionsService {

  public championArray: Array<any> = [
    { championshipId: 1,
      showName: "Raw",
      championshipType: [
        { championshipTypeId: 1,
          championshipName: 'WWE Champion',
          superstarName: 'Brock Lesnar',
          ppvName: 'Wrestlemania 31',
          reignCount: 10
        },
        { championshipTypeId: 2, 
          championshipName: 'United State Champion',
          superstarName: 'Austin Theory',
          ppvName: 'Clash of Champions 31',
          reignCount: 2
        },
        { championshipTypeId: 3, 
            championshipName: 'Tag Team Champion',
            superstarName: 'Jimmy Uso',
            superstarName2: 'Jay Uso',
            teamName: 'The Usos',
            ppvName: 'Payback 31',
            reignCount: 13
        },
        { championshipTypeId: 4, 
            championshipName: 'Womens Champion',
            superstarName: 'Bianca Belair',
            ppvName: 'Backlash 32',
            reignCount: 5
          }
      ]
    },
    { championshipId: 2,
      showName: "Smackdown", 
      championshipType: [
        { championshipTypeId: 1,
          championshipName: 'WWE Champion',
          superstarName: 'Roman Reigns',
          ppvName: 'Wrestlemania 31',
          reignCount: 10
        },
        { championshipTypeId: 2, 
          championshipName: 'Intercontinental Champion',
          superstarName: 'Ricochet',
          ppvName: 'Clash of Champions 31',
          reignCount: 2
        },
        { championshipTypeId: 3, 
            championshipName: 'Tag Team Champion',
            superstarName: 'Jimmy Uso',
            superstarName2: 'Jay Uso',
            teamName: '',
            ppvName: 'Payback 31',
            reignCount: 13
        },
        { championshipTypeId: 4, 
            championshipName: 'Womens Champion',
            superstarName: 'Ronda Rousey',
            ppvName: 'Backlash 32',
            reignCount: 5
          }
      ]
    },
    { championshipId: 3,
        showName: "NXT", 
        championshipType: [
          { championshipTypeId: 1,
            championshipName: 'NXT Champion',
            superstarName: 'Walter',
            ppvName: 'NXT Takeover',
            reignCount: 10
          },
          { championshipTypeId: 2, 
            championshipName: 'North American Champion',
            superstarName: 'Alexander Wolfe',
            ppvName: 'NXT Takeover',
            reignCount: 2
          },
          { championshipTypeId: 3, 
            championshipName: 'United Kingdom Champion',
            superstarName: 'Batista',
            ppvName: 'NXT Takeover',
            reignCount: 2
          },
          { championshipTypeId: 4, 
              championshipName: 'Tag Team Champion',
              superstarName: 'Marcel Barthel',
              superstarName2: 'Fabian Aichner',
              teamName: 'Imperium',
              ppvName: 'Payback 31',
              reignCount: 13
          },
          { championshipTypeId: 5, 
              championshipName: 'Womens Champion',
              superstarName: 'Mandy Rose',
              ppvName: 'NXT Takeover',
              reignCount: 5
            }
        ]
    },
    { championshipId: 4,
        showName: "Special", 
        championshipType: [
          { championshipTypeId: 1,
            championshipName: 'All-Star Champion',
            superstarName: 'Seth Rollins'
          },
          { championshipTypeId: 2, 
            championshipName: 'Money in the Bank',
            superstarName: 'Seth Rollins',
            superstarName2: 'Sasha Banks'
          },
          { championshipTypeId: 3, 
            championshipName: 'Royal Rumble',
            superstarName: 'Shawn Michaels',
            superstarName2: 'Naomi'
          }
        ]
    }
  ];

  constructor() { }

  getChampion() {
    return this.championArray;
  }
}

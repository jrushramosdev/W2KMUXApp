import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddChampionshipManagement, 
  UpdateChampionshipManagement, 
  AddChampionshipTypeManagement, 
  UpdateChampionshipTypeManagement } from '../../models/championship-management';

@Injectable({
  providedIn: 'root'
})
export class ChampionshipManagementService {

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

  baseUrl = environment.baseUrl;
  championshipManagementApi = '/ChampionshipManagement'
  championshipTypeManagementApi = '/ChampionshipTypeManagement'

  constructor(private http: HttpClient) { }

  getChampion() {
    return this.championArray;
  }

  //** Championship */
  getChampionshipList() {
    return this.http.get(this.baseUrl + this.championshipManagementApi + '/GetChampionshipManagementList');
  }

  getChampionship(id: string) {
    return this.http.get(this.baseUrl + this.championshipManagementApi + '/GetChampionshipManagement/'+ id);
  }

  addChampionship(championship: AddChampionshipManagement) {
    return this.http.post(this.baseUrl + this.championshipManagementApi + '/AddChampionshipManagement', championship);
  }

  updateChampionship(championship: UpdateChampionshipManagement) {
    return this.http.put(this.baseUrl + this.championshipManagementApi + '/UpdateChampionshipManagement', championship);
  }

  deleteChampionship(id: string) {
    return this.http.delete(this.baseUrl + this.championshipManagementApi + '/DeleteChampionshipManagement/'+ id);
  }

  //** Championship Type */
  getChampionshipTypeList() {
    return this.http.get(this.baseUrl + this.championshipTypeManagementApi + '/GetChampionshipTypeManagementList');
  }

  getChampionshipType(id: string) {
    return this.http.get(this.baseUrl + this.championshipTypeManagementApi + '/GetChampionshipTypeManagement/'+ id);
  }

  addChampionshipType(championshiptype: AddChampionshipTypeManagement) {
    return this.http.post(this.baseUrl + this.championshipTypeManagementApi + '/AddChampionshipTypeManagement', championshiptype);
  }

  updateChampionshipType(championshiptype: UpdateChampionshipTypeManagement) {
    return this.http.put(this.baseUrl + this.championshipTypeManagementApi + '/UpdateChampionshipTypeManagement', championshiptype);
  }

  deleteChampionshipType(id: string) {
    return this.http.delete(this.baseUrl + this.championshipTypeManagementApi + '/DeleteChampionshipTypeManagement/'+ id);
  }

}

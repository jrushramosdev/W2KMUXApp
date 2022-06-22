import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddChampionshipManagement, UpdateChampionshipManagement } from '../../models/championship-management';
import { AddChampionshipTypeManagement, UpdateChampionshipTypeManagement } from '../../models/championship-management';

@Injectable({
  providedIn: 'root'
})
export class ChampionshipManagementService {

  baseUrl = environment.baseUrl;
  championshipManagementApi = '/ChampionshipManagement'
  championshipTypeManagementApi = '/ChampionshipTypeManagement'

  constructor(private http: HttpClient) { }

  //** Championship Management */
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

  //** Champions */
  getChampionsList() {
    return this.http.get(this.baseUrl + this.championshipManagementApi + '/GetChampionsNestedList');
  }

}

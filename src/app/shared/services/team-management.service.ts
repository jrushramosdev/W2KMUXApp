import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddTeamManagement, UpdateTeamManagement } from '../../models/team-management';

@Injectable({
  providedIn: 'root'
})
export class TeamManagementService {

  baseUrl = environment.baseUrl;
  teamManagementApi = '/TeamManagement'
  teamHistoryApi = '/TeamHistory'

  constructor(private http: HttpClient) { }

  getTeamList() {
    return this.http.get(this.baseUrl + this.teamManagementApi + '/GetTeamManagementList');
  }

  getTeam(id: string) {
    return this.http.get(this.baseUrl + this.teamManagementApi + '/GetTeamManagement/'+ id);
  }

  addTeam(team: AddTeamManagement) {
    return this.http.post(this.baseUrl + this.teamManagementApi + '/AddTeamManagement', team);
  }

  updateTeam(team: UpdateTeamManagement) {
    return this.http.put(this.baseUrl + this.teamManagementApi + '/UpdateTeamManagement', team);
  }

  deleteTeam(id: string) {
    return this.http.delete(this.baseUrl + this.teamManagementApi + '/DeleteTeamManagement/'+ id);
  }

  getTeamHistoryList(isactiveonly: string) {
    return this.http.get(this.baseUrl + this.teamHistoryApi + '/GetTeamHistoryNestedList/'+ isactiveonly);
  }
}

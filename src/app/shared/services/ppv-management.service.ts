import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddPPVManagement, UpdatePPVManagement } from '../../models/ppv-management';

@Injectable({
  providedIn: 'root'
})
export class PPVManagementService {

  baseUrl = environment.baseUrl;
  ppvManagementApi = '/PPVManagement'

  constructor(private http: HttpClient) { }

  getPPVList() {
    return this.http.get(this.baseUrl + this.ppvManagementApi + '/GetPPVManagementList');
  }

  getPPV(id: string) {
    return this.http.get(this.baseUrl + this.ppvManagementApi + '/GetPPVManagement/'+ id);
  }

  addPPV(ppv: AddPPVManagement) {
    return this.http.post(this.baseUrl + this.ppvManagementApi + '/AddPPVManagement', ppv);
  }

  updatePPV(ppv: UpdatePPVManagement) {
    return this.http.put(this.baseUrl + this.ppvManagementApi + '/UpdatePPVManagement', ppv);
  }

  deletePPV(id: string) {
    return this.http.delete(this.baseUrl + this.ppvManagementApi + '/DeletePPVManagement/'+ id);
  }
}

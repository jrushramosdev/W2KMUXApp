import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddShowManagement, UpdateShowManagement,  } from '../../models/show-management';

@Injectable({
  providedIn: 'root'
})
export class ShowManagementService {

  baseUrl = environment.baseUrl;
  showManagementApi = '/ShowManagement'

  constructor(private http: HttpClient) { }

  getShowList() {
    return this.http.get(this.baseUrl + this.showManagementApi + '/GetShowManagementList');
  }

  getShow(id: string) {
    return this.http.get(this.baseUrl + this.showManagementApi + '/GetShowManagement/'+ id);
  }

  addShow(show: AddShowManagement) {
    return this.http.post(this.baseUrl + this.showManagementApi + '/AddShowManagement', show);
  }

  updateShow(show: UpdateShowManagement) {
    return this.http.put(this.baseUrl + this.showManagementApi + '/UpdateShowManagement', show);
  }

  deleteShow(id: string) {
    return this.http.delete(this.baseUrl + this.showManagementApi + '/DeleteShowManagement/'+ id);
  }
}

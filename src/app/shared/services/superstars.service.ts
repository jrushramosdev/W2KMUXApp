import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddSuperstars, UpdateSuperstars } from '../../models/superstars';

@Injectable({
    providedIn: 'root'
  })
  export class SuperstarsService {
    baseUrl = environment.baseUrl;
    superstarApi = '/Superstar'

    constructor(private http: HttpClient) { }

    getSuperstarList() {
        return this.http.get(this.baseUrl + this.superstarApi + '/GetSuperstarList');
    }

    getSuperstar(id: string) {
        return this.http.get(this.baseUrl + this.superstarApi + '/GetSuperstar/'+ id);
    }

    addSuperstar(superstar: AddSuperstars) {
        return this.http.post(this.baseUrl + this.superstarApi + '/AddSuperstar', superstar);
    }

    updateSuperstar(superstar: UpdateSuperstars) {
        return this.http.put(this.baseUrl + this.superstarApi + '/UpdateSuperstar', superstar);
    }

    deleteSuperstar(id: string) {
        return this.http.delete(this.baseUrl + this.superstarApi + '/DeleteSuperstar/'+ id);
    }
}
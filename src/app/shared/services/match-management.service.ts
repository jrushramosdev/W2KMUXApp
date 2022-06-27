import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddMatchTitleManagement, UpdateMatchTitleManagement } from '../../models/match-management';
import { AddMatchTypeManagement, UpdateMatchTypeManagement } from '../../models/match-management';
import { AddMatchFormatManagement, UpdateMatchFormatManagement } from '../../models/match-management';

@Injectable({
    providedIn: 'root'
  })
  export class MatchManagementService {

    baseUrl = environment.baseUrl;
    matchTitleManagementApi = '/MatchTitleManagement'
    matchTypeManagementApi = '/MatchTypeManagement'
    matchFormatManagementApi = '/MatchFormatManagement'

    constructor(private http: HttpClient) { }

    //** Match Title Management */
    getMatchTitleList() {
        return this.http.get(this.baseUrl + this.matchTitleManagementApi + '/GetMatchTitleManagementList');
    }

    getMatchTitle(id: string) {
        return this.http.get(this.baseUrl + this.matchTitleManagementApi + '/GetMatchTitleManagement/'+ id);
    }

    addMatchTitle(matchtitle: AddMatchTitleManagement) {
        return this.http.post(this.baseUrl + this.matchTitleManagementApi + '/AddMatchTitleManagement', matchtitle);
    }

    updateMatchTitle(matchtitle: UpdateMatchTitleManagement) {
        return this.http.put(this.baseUrl + this.matchTitleManagementApi + '/UpdateMatchTitleManagement', matchtitle);
    }

    deleteMatchTitle(id: string) {
        return this.http.delete(this.baseUrl + this.matchTitleManagementApi + '/DeleteMatchTitleManagement/'+ id);
    }

    //** Match Type Management */
    getMatchTypeList() {
        return this.http.get(this.baseUrl + this.matchTypeManagementApi + '/GetMatchTypeManagementList');
    }

    getMatchType(id: string) {
        return this.http.get(this.baseUrl + this.matchTypeManagementApi + '/GetMatchTypeManagement/'+ id);
    }

    addMatchType(matchtype: AddMatchTypeManagement) {
        return this.http.post(this.baseUrl + this.matchTypeManagementApi + '/AddMatchTypeManagement', matchtype);
    }

    updateMatchType(matchtype: UpdateMatchTypeManagement) {
        return this.http.put(this.baseUrl + this.matchTypeManagementApi + '/UpdateMatchTypeManagement', matchtype);
    }

    deleteMatchType(id: string) {
        return this.http.delete(this.baseUrl + this.matchTypeManagementApi + '/DeleteMatchTypeManagement/'+ id);
    }

    //** Match Format Management */
    getMatchFormatList() {
        return this.http.get(this.baseUrl + this.matchFormatManagementApi + '/GetMatchFormatManagementList');
    }

    getMatchFormat(id: string) {
        return this.http.get(this.baseUrl + this.matchFormatManagementApi + '/GetMatchFormatManagement/'+ id);
    }

    addMatchFormat(matchformat: AddMatchFormatManagement) {
        return this.http.post(this.baseUrl + this.matchFormatManagementApi + '/AddMatchFormatManagement', matchformat);
    }

    updateMatchFormat(matchformat: UpdateMatchFormatManagement) {
        return this.http.put(this.baseUrl + this.matchFormatManagementApi + '/UpdateMatchFormatManagement', matchformat);
    }

    deleteMatchFormat(id: string) {
        return this.http.delete(this.baseUrl + this.matchFormatManagementApi + '/DeleteMatchFormatManagement/'+ id);
    }
}
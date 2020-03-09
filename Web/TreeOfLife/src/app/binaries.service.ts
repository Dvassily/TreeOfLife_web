import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BinariesService {
  constructor(private http : HttpClient) { }
  
  findAll() {
    return this.http.get(AuthenticationService.dbUrl + 'binaries);
  }
}

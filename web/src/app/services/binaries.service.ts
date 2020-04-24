import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BinariesService {
  private static readonly dbUrl = 'http://localhost:8888/';
  constructor(private http : HttpClient) { }

  findAll() : Observable<any> {
    return this.http.get(BinariesService.dbUrl + 'binaries');
  }

  findUserBinaries() {
    return this.http.get(BinariesService.dbUrl + 'user-binaries', {
      params: {
        accessToken: localStorage.getItem("token")
      }
    });
  }

  binaryUrl(file) : string {
    return BinariesService.dbUrl + 'binaries/' + file;
  }



}

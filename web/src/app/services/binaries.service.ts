import { HttpClient, HttpHeaders, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  insert(formData) {
    return this.http.post<any>(BinariesService.dbUrl + 'binaries/', formData);
  }

  delete(path: string) {
    return this.http.delete<any>(BinariesService.dbUrl + 'binaries/', {
      params: {
        path,
      }
    });
  }
}

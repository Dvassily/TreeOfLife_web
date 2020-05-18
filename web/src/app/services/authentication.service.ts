import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  private static readonly dbUrl = 'http://localhost:8888/';
  public user: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }



  login(email: string, password: string) {
    return this.http.post(AuthenticationService.dbUrl + 'auth/login', {
      mail: email,
      password,
    });
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('token');
  }

  register(form) {
    return this.http.post(AuthenticationService.dbUrl + 'auth/register', form);
  }


  getUser(accessToken: string) {
    return this.http.get(AuthenticationService.dbUrl + 'user', {
      params: {
        accessToken,
      }
    });
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');

    if (token) {
      return true;
    }

    return false;
  }

}

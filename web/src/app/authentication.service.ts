import { Injectable } from '@angular/core'
;import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
interface inscriptionResponse{
  success: boolean
}
@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private static readonly dbUrl = 'http://localhost:8888/';
  private member : BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  
  constructor(private http : HttpClient) { }

  checkExists(mail, password) : Observable<any> {
    return this.http.get(AuthenticationService.dbUrl + 'members/' + mail + '/' + password);
  }

  getMember() : BehaviorSubject<any> {
    return this.member;
  }

  logIn(member) {
    this.member.next(member);
  }

  logOut(){
    this.member.next(undefined);
  }
  inscriptionUser(nom,prenom,email,mdp){
    return this.http.get<inscriptionResponse>(AuthenticationService.dbUrl + 'inscriptions' + '/' +nom + '/' + prenom + '/' + email + '/' + mdp);
    /*
    return this.http.post<inscriptionResponse>('api/inscription',{
      nom,
      prenom,
      email,
      mdp
    })*/
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  inscrit = false;
  mdpDiff = false;
  existsMail = false;
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }
  inscriptionrUser(event) {
    event.preventDefault();
    const errors = [];
    const target = event.target;

    const nom = target.querySelector('#Nom').value;
    const prenom = target.querySelector('#Prenom').value;
    const email = target.querySelector('#Email').value;
    const mdp = target.querySelector('#Motdepasse').value;
    const cmdp = target.querySelector('#CMotdepasse').value;

    if (mdp != cmdp) {
      this.mdpDiff = true;
      console.error('les mots de passe sont differents');
      errors.push('Les mots de passe sont differents');
    } else {
    if (errors.length === 0) {
      this.auth.register(email, mdp).subscribe((res: any) => {

       if (res?.accessToken) {
          this.inscrit = true;
          console.log(this.inscrit);
          // this.router.navigate(['http://localhost:4200/binaries'])
        } else {
          this.existsMail = true;
          console.log('existsMail: ' + this.existsMail);
        }
      });
    }}
    console.log(nom, prenom, email, mdp);
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  constructor(private auth: AuthenticationService,private router: Router) { }

  ngOnInit(): void {
  }
  inscriptionrUser(event){
    event.preventDefault()
    const errors = []
    const target = event.target
    const nom = target.querySelector('#Nom').value
    const prenom = target.querySelector('#Prenom').value
    const email = target.querySelector('#Email').value
    const mdp = target.querySelector('#Motdepasse').value
    const cmdp = target.querySelector('#CMotdepasse').value

    if(mdp != cmdp){
      console.error("les mots de passe sont differents");
      errors.push("Les mots de passe sont differents")      
    }else{
    if(errors.length === 0){
      this.auth.inscriptionUser(nom,prenom,email,mdp).subscribe(data =>{
        console.log(data)
        
        //this.router.navigate(['http://localhost:4200/binaries'])
      
      })
    }}
    console.log(nom,prenom,email,mdp)
  }
}

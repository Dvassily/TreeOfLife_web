import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BinariesComponent } from './pages/binaries/binaries.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { RouterModule } from '@angular/router';
import {AuthenticationService} from './services/authentication.service';
import { UploadComponent } from './pages/upload/upload.component';

@NgModule({
  declarations: [
    AppComponent,
    BinariesComponent,
    AuthenticationComponent,
    InscriptionComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot([
      {
        path: 'inscription',
        component: InscriptionComponent

      }
    ])
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private authService: AuthenticationService) {
    const token = localStorage.getItem('token');

    if(token) {
      this.authService.getUser(token).subscribe(res => {
        this.authService.user.next(res);
      });
    }

  }
}

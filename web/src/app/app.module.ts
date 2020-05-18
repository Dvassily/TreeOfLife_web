import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {AuthenticationService} from './services/authentication.service';
import {BinariesService} from './services/binaries.service';
import { MytreeComponent } from './app-pages/mytree/mytree.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginPageComponent } from './app-pages/login-page/login-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DownloadPageComponent } from './app-pages/download-page/download-page.component';
import { RegisterPageComponent } from './app-pages/register-page/register-page.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    MytreeComponent,
    LoginPageComponent,
    DownloadPageComponent,
    RegisterPageComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [AuthenticationService, BinariesService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private authService: AuthenticationService) {
    let token = localStorage.getItem("token");

    if(token) {
      this.authService.getUser(token).subscribe(res => {
        console.log(res)
        this.authService.user.next(res);
      });
    }
  }
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BinariesComponent } from './pages/binaries/binaries.component';

const routes: Routes = [{
  path : '',
  redirectTo : 'binaries',
  pathMatch : 'full'
}, {
  path : 'binaries',
  component : BinariesComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

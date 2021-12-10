import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { MainComponent } from './modules/main/main.component';

const routes: Routes = [{
  path:"",
  component:DefaultComponent,
  children: [{
    path:"",
    component:MainComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

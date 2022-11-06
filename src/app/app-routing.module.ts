import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren: ()=>import('./modules/homepage/homepage.module').then(m=>m.HomepageModule)
  },
  {
    path:'prerequisites',
    loadChildren: ()=>import('./modules/prerequisites/prerequisites.module').then(m=>m.PrerequisitesModule)
  },
  {
    path:'**',
    loadChildren: ()=>import('./modules/homepage/homepage.module').then(m=>m.HomepageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
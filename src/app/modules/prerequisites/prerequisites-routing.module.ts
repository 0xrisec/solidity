import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrerequisitesComponent } from 'src/app/components/prerequisites/prerequisites.component';
import prerequisitesConfig from 'src/assets/config/prerequisites.json';

const routes: Routes = [
  {path:'',component:PrerequisitesComponent,data: prerequisitesConfig}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrerequisitesRoutingModule { }

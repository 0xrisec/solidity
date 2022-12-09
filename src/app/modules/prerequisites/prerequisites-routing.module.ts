import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrerequisitesComponent } from 'src/app/components/prerequisites/prerequisites.component';
import prerquisitesConfig from 'src/assets/config/prerquisites.json';

const routes: Routes = [
  {path:'',component:PrerequisitesComponent,data: prerquisitesConfig}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrerequisitesRoutingModule { }

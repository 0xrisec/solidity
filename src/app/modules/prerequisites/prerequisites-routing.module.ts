import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrerequisitesComponent } from 'src/app/components/prerequisites/prerequisites.component';

const routes: Routes = [
  {path:'',component:PrerequisitesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrerequisitesRoutingModule { }

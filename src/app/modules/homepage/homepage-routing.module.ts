import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from 'src/app/components/blogs/blogs.component';
import { DocLayoutComponent } from 'src/app/components/doc/doclayout.component';
import { HomepageComponent } from 'src/app/components/homepage/homepage.component';
import basicsConfig from 'src/assets/config/basics.json';
import homeConfig from 'src/assets/config/homepage.json';


const routes: Routes = [
  {path:'',component:HomepageComponent,data:homeConfig},
  {path:'basics',component:DocLayoutComponent,data: basicsConfig},
  {path:'blogs',component:BlogsComponent,data: basicsConfig}

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule { }

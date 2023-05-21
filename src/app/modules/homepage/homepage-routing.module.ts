import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from 'src/app/components/blogs/blogs.component';
import { DocLayoutComponent } from 'src/app/components/doc/doclayout.component';
import { HomepageComponent } from 'src/app/components/homepage/homepage.component';
import { RoadmapsComponent } from 'src/app/components/roadmaps/roadmaps.component';
import basicsConfig from 'src/assets/config/basics.json';
import hacksConfig from 'src/assets/config/hacks.json';
import homeConfig from 'src/assets/config/homepage.json';
import roadmapsConfig from 'src/assets/config/roadmaps.json';
import cheatsheetsConfig from 'src/assets/config/cheatsheets.json';
import defiConfig from 'src/assets/config/defi.json';
import privateBlockchainConfig from 'src/assets/config/private-blockchain.json';

const routes: Routes = [
  {path:'',component:HomepageComponent,data:homeConfig, pathMatch: 'full'},
  {path:'basics/:fileName',component:DocLayoutComponent,data: basicsConfig},
  {path:'blogs',component:BlogsComponent},
  {path:'roadmaps/:fileName',component:DocLayoutComponent,data: roadmapsConfig},
  {path:'hacks/:fileName',component:DocLayoutComponent,data: hacksConfig},
  {path:'cheatsheets/:fileName',component:DocLayoutComponent,data: cheatsheetsConfig},
  {path:'defi/:fileName',component:DocLayoutComponent,data: defiConfig},
  {path:'private-blockchain/:fileName',component:DocLayoutComponent,data: privateBlockchainConfig}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule { }

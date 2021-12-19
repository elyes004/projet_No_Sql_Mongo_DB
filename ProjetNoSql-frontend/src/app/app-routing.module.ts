import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementDetailsComponent } from './components/announcement-details/announcement-details.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MarketComponent } from './components/market/market.component';
import { ClientsComponent } from './components/profile/clients/clients.component';
import { DashboardComponent } from './components/profile/dashboard/dashboard.component';
import { DealsComponent } from './components/profile/deals/deals.component';
import { ItemsComponent } from './components/profile/items/items.component';
import { ProfileComponent } from './components/profile/profile.component';
import { VisitsComponent } from './components/profile/visits/visits.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard'

const routes: Routes = [
  { path:'home', component:HomeComponent},
  { path:'signup', component: RegisterComponent},
  { path:'signin', component: LoginComponent},
  { path:'profile', component: ProfileComponent, canActivate: [AuthGuard],
      children:[
        { path:'dashboard', component: DashboardComponent},
        { path:'items', component: ItemsComponent},
        { path:'clients', component: ClientsComponent},
        { path:'deals', component: DealsComponent},
        { path:'visits', component: VisitsComponent},
        { path:'', redirectTo:'items', pathMatch:'full'}

      ]
  },
  { path:'market', component: MarketComponent},
  { path:'market/:id', component:AnnouncementDetailsComponent},// canActivate: [AuthGuard]  el login traj3ou lil item detail page
  { path:'', redirectTo:'/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

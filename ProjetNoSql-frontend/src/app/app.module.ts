import { NgModule } from '@angular/core';
//modules
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from './angular-materials/angular-materials.module';
import { HttpClientModule } from '@angular/common/http';
import { MatCarouselModule } from '@ngmodule/material-carousel';

//components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MarketComponent } from './components/market/market.component'

import { FilterPipe }  from './components/market/filter.pipe';
import { AuthGuard } from './guards/auth.guard';
import { ItemsComponent } from './components/profile/items/items.component';
import { MytableComponent } from './components/mytable/mytable.component';
import { ClientsComponent } from './components/profile/clients/clients.component';
import { AddItemModalComponent } from './components/profile/items/add-item-modal/add-item-modal.component';
import { AddAppartmentComponent } from './components/profile/items/add-appartment/add-appartment.component';
import { DeleteConfirmationDialogComponent } from './components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { EditAnnouncementDialogComponent } from './components/edit-announcement-dialog/edit-announcement-dialog.component';
import { DealsComponent } from './components/profile/deals/deals.component';
import { CreateContractDialog, VisitsComponent } from './components/profile/visits/visits.component';
import { AnnouncementDetailsComponent, VisitDateDialog } from './components/announcement-details/announcement-details.component';
import { DashboardComponent } from './components/profile/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    HeaderComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    MarketComponent,
    ItemsComponent,
    MytableComponent,
    ClientsComponent,
    AddItemModalComponent,
    AddAppartmentComponent,
    DeleteConfirmationDialogComponent,
    EditAnnouncementDialogComponent,
    DealsComponent,
    VisitsComponent,
    AnnouncementDetailsComponent,
    VisitDateDialog,
    CreateContractDialog,
    DashboardComponent,
    
  ],
  entryComponents:[
    AddItemModalComponent,
    AddAppartmentComponent,
    DeleteConfirmationDialogComponent,
    VisitDateDialog,
    CreateContractDialog,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCarouselModule.forRoot()
  ],
  providers: [ AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

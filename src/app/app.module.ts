import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {PerfilComponent} from './Pages/perfil/perfil.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Base64ToImagePipe } from './pipes/pipes';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { FooterComponent } from './Pages/footer/footer.component';
import { NavbarComponent} from './Pages/main-user/navbar/navbar.component';
import { NavbarEditUserComponent} from './Pages/editor-user/navbar-editor-user/navbar-edit-user.component';
import { SuperAdminNavbarComponent} from './Pages/super-admin-user/super-admin-navbar/super-admin-navbar.component';
import { CropsComponent } from './Pages/main-user/crops/crops.component';
import { InfoCropsComponent } from './Pages/main-user/infocrops/infocrops.component';
import { LandComponent } from './Pages/main-user/land/land.component';
import { MyCropsComponent } from './Pages/main-user/my crops/my_crops.component';
import { MyLandComponent } from './Pages/main-user/my land/my_land.component';
import { MyLandsComponent } from './Pages/main-user/edit-my-land/my-lands.component';
import { PestsComponent } from './Pages/main-user/pests/pests.component';
import { CultivoTerrenoComponent } from './Pages/main-user/cultivoterreno/cultivoterreno.component';
import { AddCropComponent } from './Pages/editor-user/add-crop/add_crop.component';
import { AddPestsComponent } from './Pages/editor-user/add-pests/add_pests.component';

import { AllCropComponent } from './Pages/editor-user/all-crop/all-crop.component';
import { AllPestsComponent } from './Pages/editor-user/all-pests/all-pests.component';
import { EditCropComponent } from './Pages/editor-user/edit-crop/edit_crop.component';
import { EditPestsComponent } from './Pages/editor-user/edit-pests/edit_pests.component';
import { ClimatesChangesComponent } from './Pages/super-admin-user/climates-changes/climates_changes.component';
import { AllClimatesComponent} from './Pages/super-admin-user/all-climates/all-climates.component';
import { HitoryCropComponent } from './Pages/super-admin-user/history-of-crop-changes/history_of_crop.component';
import { HitoryPestsComponent } from './Pages/super-admin-user/history-of-pests-change/history_of_pests.component';
import { UsersComponent } from './Pages/super-admin-user/users/users.component';
import { CookieService } from 'ngx-cookie-service';
import { EditClimatesComponent} from './Pages/super-admin-user/edit-climates/edit-climates.component';

@NgModule({
  declarations: [
    AppComponent,
    PerfilComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    NavbarEditUserComponent,
    SuperAdminNavbarComponent,
    HomeComponent,
    CropsComponent,
    LandComponent,
    MyCropsComponent,
    MyLandComponent,
    MyLandsComponent,
    PestsComponent,
    AllClimatesComponent,
    CultivoTerrenoComponent,
    AddCropComponent,
    AddPestsComponent,

    AllCropComponent,
    AllPestsComponent,
    EditCropComponent,
    EditPestsComponent,
    ClimatesChangesComponent,
    HitoryCropComponent,
    HitoryPestsComponent,
    UsersComponent,
    Base64ToImagePipe,
    InfoCropsComponent,
    EditClimatesComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

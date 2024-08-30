import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { PerfilComponent } from './Pages/perfil/perfil.component';
import { NavbarComponent } from './Pages/main-user/navbar/navbar.component';
import { NavbarEditUserComponent } from './Pages/editor-user/navbar-editor-user/navbar-edit-user.component';
import { SuperAdminNavbarComponent } from './Pages/super-admin-user/super-admin-navbar/super-admin-navbar.component';
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
import { EditClimatesComponent} from './Pages/super-admin-user/edit-climates/edit-climates.component';
import { HitoryCropComponent } from './Pages/super-admin-user/history-of-crop-changes/history_of_crop.component';
import { HitoryPestsComponent } from './Pages/super-admin-user/history-of-pests-change/history_of_pests.component';
import { UsersComponent } from './Pages/super-admin-user/users/users.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  {
    path: 'navbar', component: NavbarComponent, children: [
      { path: 'cultivos', component: CropsComponent },
      { path: 'informacion/:id', component: InfoCropsComponent},
      { path: 'terreno', component: LandComponent },
      { path: 'mis-cultivos/:id', component: MyCropsComponent },
      { path: 'mis-terreno', component: MyLandComponent },
      { path: 'editar-terreno/:id', component: MyLandsComponent }, 
      { path: 'plaga/:id', component: PestsComponent },
      { path: 'agregarcultivo', component: CultivoTerrenoComponent },
      { path: 'perfil/:id', component: PerfilComponent }
    ]
  },
    {
      path: 'editor-nav', component: NavbarEditUserComponent, children:[
        { path: 'agregar-cultivo', component: AddCropComponent },
        { path: 'agregar-plagas', component: AddPestsComponent },

        { path: 'todos-los-cultivos', component: AllCropComponent },
        { path: 'todos-las-plagas', component:AllPestsComponent },
        { path: 'editar-cultivo/:id', component: EditCropComponent },
        { path: 'editar-plaga/:id', component: EditPestsComponent},
        { path: 'perfil/:id', component: PerfilComponent }
      ]
      
    },
    {
      path: 'super-admin-nav', component: SuperAdminNavbarComponent, children: [
        { path: 'agregar-clima', component: ClimatesChangesComponent },
        { path: 'edit-clima/:id', component: EditClimatesComponent },
        { path: 'climas', component: AllClimatesComponent },
        { path: 'historia-de-cultivos', component: HitoryCropComponent },
        { path: 'historial-de-pestes', component: HitoryPestsComponent },
        { path: 'usuarios', component:UsersComponent }
      ]
    },
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisteretudiantComponent} from "./registeretudiant/registeretudiant.component";
import {RegisterprofComponent} from "./registerprof/registerprof.component";
import {MdpoublieComponent} from "./mdpoublie/mdpoublie.component";
import {AuthGuard} from "./guard/auth.guard";
import {LogoutGuard} from "./guard/logout.guard";

const routes: Routes = [
  {path:'',component:LoginComponent,canActivate: [LogoutGuard]},
  {path:'registerStudent',component:RegisteretudiantComponent},
  {path:'registerProf',component:RegisterprofComponent},
  {path:'mdpOublie',component:MdpoublieComponent},
  {path:'home',component : HomeComponent,canActivate : [AuthGuard],children:[
      {path:'moduleEtudiant',
        loadChildren:'./home/etudiant/etudiant.module#EtudiantModule' //EtudiantModule-->etudiant.module
      },

      {path:'moduleProf',
        loadChildren:'./home/prof/prof.module#ProfModule' //ProfModule-->prof.module
      },

      {path:'moduleDiscussion',
        loadChildren:'./home/discussion/discussion.module#DiscussionModule'
      },

      {path:'moduleAdministrateur',
        loadChildren:'./home/admin/admin.module#AdminModule'
      },

      {path:'moduleActualite',
        loadChildren:'./home/actualite/actualite.module#ActualiteModule'
      },

    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ModifieretudiantComponent} from "./modifieretudiant/modifieretudiant.component";
import {ConsulterResComponent} from "./consulter-res/consulter-res.component";
import {ConsulterCoursStudentComponent} from "./consulter-cours-student/consulter-cours-student.component";
//import {LoginetudiantComponent} from "./loginetudiant/loginetudiant.component";

const routes: Routes = [
  {path:'modifieretudiant',component : ModifieretudiantComponent},
  {path:'consulterResultat',component : ConsulterResComponent},
  {path:'consulterCours',component : ConsulterCoursStudentComponent},
  //{path:'loginetudiant',component : LoginetudiantComponent},

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtudiantRoutingModule { }

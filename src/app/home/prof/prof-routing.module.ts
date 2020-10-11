import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ModifierprofComponent} from "./modifierprof/modifierprof.component";
import {ConsulterPubComponent} from "./consulter-pub/consulter-pub.component";
import {ConsulterCoursProfComponent} from "./consulter-cours-prof/consulter-cours-prof.component";


const routes: Routes = [
  {path:'modifierProf',component : ModifierprofComponent},
  {path:'consulterPub',component : ConsulterPubComponent},
  {path:'consulterCoursProf',component : ConsulterCoursProfComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfRoutingModule { }

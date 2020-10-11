import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ModifieradminComponent} from "../admin/modifieradmin/modifieradmin.component";
import {ConsulterActualiteComponent} from "./consulter-actualite/consulter-actualite.component";

const routes: Routes = [
  {path:'ConsulterActualite',component : ConsulterActualiteComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActualiteRoutingModule { }

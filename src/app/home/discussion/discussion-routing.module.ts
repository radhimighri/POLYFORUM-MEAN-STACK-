import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConsultermessagesComponent} from "./consultermessages/consultermessages.component";
import {EnvoyermessageComponent} from "./envoyermessage/envoyermessage.component";
import {SupprimermessageComponent} from "./supprimermessage/supprimermessage.component";

const routes: Routes = [
  {path:'consulterMessage',component : ConsultermessagesComponent},
  {path:'envoyerMessage',component : EnvoyermessageComponent},
  {path:'supprimerMessage',component : SupprimermessageComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscussionRoutingModule { }

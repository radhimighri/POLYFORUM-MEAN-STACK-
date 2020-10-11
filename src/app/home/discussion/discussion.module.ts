import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscussionRoutingModule } from './discussion-routing.module';
import { EnvoyermessageComponent } from './envoyermessage/envoyermessage.component';
import { SupprimermessageComponent } from './supprimermessage/supprimermessage.component';
import { ConsultermessagesComponent } from './consultermessages/consultermessages.component';

@NgModule({
  declarations: [EnvoyermessageComponent, SupprimermessageComponent, ConsultermessagesComponent],
  imports: [
    CommonModule,
    DiscussionRoutingModule
  ]
})
export class DiscussionModule { }

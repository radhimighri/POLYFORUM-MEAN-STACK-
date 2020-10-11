import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ModifieradminComponent } from './modifieradmin/modifieradmin.component';
import { ConsulterradminsComponent } from './consulter-admins/consulterradmins.component';
import { AccountsConfirmationComponent } from './accounts-confirmation/accounts-confirmation.component';
import { AccountsConfirmationProfComponent } from './accounts-confirmation-prof/accounts-confirmation-prof.component';
import { ModifierProfComponent } from './consulter-prof/modifier-prof.component';
import { ModifierEtudiantComponent } from './consulter-etudiant/modifier-etudiant.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ConsulterPubsComponent } from './consulter-pubs/consulter-pubs.component';
import { ModifierDepartementsComponent } from './consulter-deps/modifier-departements.component';
import { ModifierGroupsComponent } from './consulter-groups/modifier-groups.component';
import { EnvoyerResComponent } from './envoyer-res/envoyer-res.component';

@NgModule({
  declarations: [ModifieradminComponent, ConsulterradminsComponent, AccountsConfirmationComponent, AccountsConfirmationProfComponent, ModifierProfComponent, ModifierEtudiantComponent, ConsulterPubsComponent, ModifierDepartementsComponent, ModifierGroupsComponent, EnvoyerResComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }

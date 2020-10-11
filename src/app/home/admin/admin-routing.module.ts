import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ModifieradminComponent} from "./modifieradmin/modifieradmin.component";
import {ConsulterradminsComponent} from "./consulter-admins/consulterradmins.component";
import {AccountsConfirmationComponent} from "./accounts-confirmation/accounts-confirmation.component";
import {AccountsConfirmationProfComponent} from "./accounts-confirmation-prof/accounts-confirmation-prof.component";
import {ModifierEtudiantComponent} from "./consulter-etudiant/modifier-etudiant.component";
import {ModifierProfComponent} from "./consulter-prof/modifier-prof.component";
import {ModifierDepartementsComponent} from "./consulter-deps/modifier-departements.component";
import {ConsulterPubsComponent} from "./consulter-pubs/consulter-pubs.component";
import {ModifierGroupsComponent} from "./consulter-groups/modifier-groups.component";
import {EnvoyerResComponent} from "./envoyer-res/envoyer-res.component";
//import {LoginadminComponent} from "./loginadmin/loginadmin.component";

const routes: Routes = [
  {path:'modifierAdmin',component : ModifieradminComponent},
  {path:'consulterAdmin',component : ConsulterradminsComponent},
  {path:'validateaccounts',component: AccountsConfirmationComponent},
  {path:'validateprofaccounts',component: AccountsConfirmationProfComponent},
  {path:'UpdateStudentAccount',component: ModifierEtudiantComponent},
  {path:'UpdateProfAccount',component: ModifierProfComponent},
  {path:'UpdateDepartments',component: ModifierDepartementsComponent},
  {path:'UpdatePublications',component: ConsulterPubsComponent},
  {path:'UpdateGroups',component: ModifierGroupsComponent},
  {path:'EnvoyerResultat',component: EnvoyerResComponent},

  //{path:'loginAdmin',component : LoginadminComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

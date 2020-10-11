import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfRoutingModule } from './prof-routing.module';
import { ModifierprofComponent } from './modifierprof/modifierprof.component';
import { ConsulterCoursProfComponent } from './consulter-cours-prof/consulter-cours-prof.component';
import { ConsulterPubComponent } from './consulter-pub/consulter-pub.component';

@NgModule({
  declarations: [  ModifierprofComponent, ConsulterCoursProfComponent, ConsulterPubComponent],
  imports: [
    CommonModule,
    ProfRoutingModule
  ]
})
export class ProfModule { }

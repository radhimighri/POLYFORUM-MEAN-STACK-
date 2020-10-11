import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActualiteRoutingModule } from './actualite-routing.module';
import { ConsulterActualiteComponent } from './consulter-actualite/consulter-actualite.component';

@NgModule({
  declarations: [ConsulterActualiteComponent],
  imports: [
    CommonModule,
    ActualiteRoutingModule
  ]
})
export class ActualiteModule { }

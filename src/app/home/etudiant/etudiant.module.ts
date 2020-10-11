import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtudiantRoutingModule } from './etudiant-routing.module';
import { ModifieretudiantComponent } from './modifieretudiant/modifieretudiant.component';
import { ConsulterCoursStudentComponent } from './consulter-cours-student/consulter-cours-student.component';
import { ConsulterResComponent } from './consulter-res/consulter-res.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [  ModifieretudiantComponent, ConsulterCoursStudentComponent, ConsulterResComponent],
  imports: [
    CommonModule,
    EtudiantRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EtudiantModule { }

import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../../service/Admin.service";
import Swal from "sweetalert2";
import {FormBuilder, Validators} from "@angular/forms";
@Component({
  selector: 'app-modifier-departements',
  templateUrl: './modifier-departements.component.html',
  styleUrls: ['./modifier-departements.component.css']
})
export class ModifierDepartementsComponent implements OnInit {
  ShowDeps;
  ShowDeptByIDVar;
  ShowChefsVar;
  EditDeptForm;
  AddDeptForm;
  submitted;
  _id;
  constructor(private DepartementsService : AdminService, private formBuilder : FormBuilder) { }

  ngOnInit() {
    this.ShowAllDepartments();
    this.GetAllChefs();
    this.AddDeptForm = this.formBuilder.group({
      libelleDep: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9èé ]+$')]],
      chef: ['',Validators.required]
    });
    this.EditDeptForm = this.formBuilder.group({
      libelleDep: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9èé ]+$')]],
      chef: ['',Validators.required],
    });
  }

  ShowAllDepartments(){
    return this.DepartementsService.ShowDepartmentsList().subscribe(res=>{
        this.ShowDeps = res;
      }
    )}

  DeleteDeptFn(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: 'êtes-vous sûr ?',
      text: "La suppression sera définitive!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, Supprimer',
      cancelButtonText: 'Non, Annuler',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Supprimé!',
          'Le département a été supprimé.',
          'success'
        );
        return this.DepartementsService.DeleteDep(id).subscribe(res=>{
          this.ShowAllDepartments();
          console.log(res);
        })
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Annulé',
          'Suppression est annulée',
          'error'
        )
      }
    })
  }

  GetDeptbyID(_id,libelleDep){
    this._id = _id;
    this.EditDeptForm.get("libelleDep").setValue(libelleDep);
  }

  ShowDeptByID(){
    return this.DepartementsService.ShowCordsDept(this._id).subscribe(res=>{
      this.ShowDeptByIDVar = res;
    })
  }

  GetAllChefs(){
    return this.DepartementsService.ShowProfList().subscribe(res=>{
      this.ShowChefsVar = res;
    })
  }

  SubmitModify(){
    Swal.fire({
      position: 'center',
      type: 'success',
      title: 'La modification a été effectuée',
      showConfirmButton: false,
      timer: 1500
    })
  }

  get GetEditDept(){
    return this.EditDeptForm.controls;
  }

  get GetAddDept(){
    return this.AddDeptForm.controls;
  }

  ModifyDeptFn(){
    this.submitted = true;
    if (this.EditDeptForm.invalid)
      return;

    console.log('test1');
    console.log(this._id);
    return this.DepartementsService.ModifyDept(this._id,this.EditDeptForm.value).subscribe(()=>{
      this.submitted = false;
      this.ShowAllDepartments();
      this.GetAllChefs();
      this.SubmitModify();
    })
  }

  AddDeptFn(){
    this.submitted = true;

    if (this.AddDeptForm.invalid) {
      return;
    }

    return this.DepartementsService.AddDept(this.AddDeptForm.value).subscribe(()=>{
      this.AddAdminSWAL();
      this.ShowAllDepartments();
      this.GetAllChefs();
      this.submitted = false;
      console.log('done');
    })
  }

  AddAdminSWAL(){
    Swal.fire({
      position: 'center',
      type: 'success',
      title: 'Administrateur a été ajouté avec succés',
      showConfirmButton: false,
      timer: 1500
    })
  }

}



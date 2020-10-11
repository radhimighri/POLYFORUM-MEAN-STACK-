import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../../service/Admin.service";
import Swal from "sweetalert2";
import {FormBuilder, Validators} from "@angular/forms";
import {MustMatch} from "../../PasswordMatch";

@Component({
  selector: 'app-modifier-prof',
  templateUrl: './modifier-prof.component.html',
  styleUrls: ['./modifier-prof.component.css']

})
export class ModifierProfComponent implements OnInit {
  DepVar;
  ShowProfCordsVar;
  ShowListProfVar;
  FormEditProf;
  fileSelected : File;
  submitted : Boolean;
  _id;
  constructor(private ProfService : AdminService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.ShowDeps();
    this.ShowProf();
    this.FormEditProf = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        Date_Nais: ['', Validators.required],
        CIN: ['', Validators.required],
        nomDepartement: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        Mail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@polytechnicien.tn+$')]]
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      });
  }

  ShowDeps(){
    return this.ProfService.ShowDepartmentsList().subscribe(res=>{
      this.DepVar = res;
    })
  }

  ShowProf(){
    return this.ProfService.ShowProfList().subscribe(res=>{
      console.log(res);
      this.ShowListProfVar = res;
    })
  }

  DeleteProfAccountFn(id) {
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
          'Le compte a été supprimé.',
          'success'
        );
        return this.ProfService.DeleteAccount(id).subscribe(res=>{
          this.ShowProf();
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

  GetProfID(_id,firstName,lastName,Date_Nais,CIN,Mail){
   this._id = _id;
    this.FormEditProf.get("firstName").setValue(firstName);
    this.FormEditProf.get("lastName").setValue(lastName);
    this.FormEditProf.get("Date_Nais").setValue(Date_Nais);
    this.FormEditProf.get("CIN").setValue(CIN);
    this.FormEditProf.get("Mail").setValue(Mail);
   }

  ShowProfCordsFn(){
    return this.ProfService.ShowCordsProf(this._id).subscribe(res=>{
      this.ShowProfCordsVar = res;
    })
  }

  get GetEditProfC() {
    return this.FormEditProf.controls;
  }

  getFile($event){
    this.fileSelected=$event.target.files[0];
  }

  EditProfFn(){
    this.submitted = true;
    if (this.FormEditProf.invalid) {
      return;
    }
    console.log(this.fileSelected);
    this.ProfService.uploads(this.fileSelected).subscribe(res => {

      const data = {
        firstName: this.FormEditProf.value.firstName,
        lastName: this.FormEditProf.value.lastName,
        Mail: this.FormEditProf.value.Mail,
        Date_Nais: this.FormEditProf.value.Date_Nais,
        CIN: this.FormEditProf.value.CIN,
        nomDepartement: this.FormEditProf.value.nomDepartement,
        password: this.FormEditProf.value.password,
        photo: res["filename"],
      };
      console.log(data);

      this.ProfService.UpdateProf(this._id, data).subscribe(res => {
        console.log("data ", res);
        // this.ShowProf();
        // this.ShowDeps();
        this.submitted = false;
      });
    })
  }
}

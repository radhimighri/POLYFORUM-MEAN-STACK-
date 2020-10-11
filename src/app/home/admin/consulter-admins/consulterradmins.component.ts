import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../../service/Admin.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {MustMatch} from "../../PasswordMatch";

@Component({
  selector: 'app-consulterradmins',
  templateUrl: './consulterradmins.component.html',
  styleUrls: ['./consulterradmins.component.css']
})
export class ConsulterradminsComponent implements OnInit {
  ShowAdminsVar;
  ShowAdminCordsVar;
  submitted = false;
  submittedM = false;
  adminForm : FormGroup;
  ModifyAdminForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private AdminServices : AdminService) { }

  ngOnInit() {
    this.adminForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        Date_Nais: ['', Validators.required],
        Sexe: ['', Validators.required],
        Pays: ['', Validators.required],
        Tel: ['', Validators.required],
        CIN: ['', Validators.required],
        Mail: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]},
      {
        validator: MustMatch('password', 'confirmPassword')
      });
    this.ModifyAdminForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      Date_Nais: ['', Validators.required],
      CIN: ['', Validators.required],
      Mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]});
    this.ShowAllAdmins();
  }

  // convenience getter for easy access to form fields
  get f() { return this.adminForm.controls; }

  get fm() { return this.ModifyAdminForm.controls; }

  ModifyAdmin(id){
    this.submittedM = true;
    // stop here if form is invalid
    if (this.ModifyAdminForm.invalid) {
      return;
    }
    return this.AdminServices.ModifyAdminn(this.GetAdminID(id),this.ModifyAdminForm.value).subscribe(res=>{
      this.submittedM = false;
      console.log('your id is:',id);

  })
  };
  addAdmin() {

    //console.log('hhhhh');
    this.submitted = true;

    // stop here if form is invalid
    if (this.adminForm.invalid) {
      return;
    }
    return this.AdminServices.AddAdministrator(this.adminForm.value).subscribe(res=>{
      console.log(res);
      this.submitted = false;
      this.adminForm.reset();
      this.ShowAllAdmins();
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Administrateur a été ajouté avec succés',
        showConfirmButton: false,
        timer: 1500
      })
    })

  }
  ShowAllAdmins(){
  return this.AdminServices.ShowAdminList().subscribe(res=>{
    this.ShowAdminsVar = res;
  })}

  DeleteAdminAccountFn(id) {
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
        return this.AdminServices.DeleteAccount(id).subscribe(res=>{
          this.ShowAllAdmins();
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

  GetAdminID(id){
    return id;
  }

  ShowAdminCordsFn(id){
    return this.AdminServices.ShowCordsAdmin(this.GetAdminID(id)).subscribe(res=>{
      this.ShowAdminCordsVar = res;
    })
  }
}

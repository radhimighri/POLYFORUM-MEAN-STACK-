import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../../service/Admin.service";
import Swal from "sweetalert2";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-modifier-groups',
  templateUrl: './modifier-groups.component.html',
  styleUrls: ['./modifier-groups.component.css']
})
export class ModifierGroupsComponent implements OnInit {
  _id;
  libelleGroup;
  ShowGroupsList;
  ShowGroupByIdVar;
  GroupEdit;
  GroupData;
  submitted : Boolean;
  constructor(private ShowGroupsService : AdminService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.ShowGroups();
    this.GroupData = this.formBuilder.group({
      libelleGroup: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9èé ]+$')]]
    });
    this.GroupEdit = this.formBuilder.group({
      libelleGroup: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9èé ]+$')]]
    });
  }

  ShowGroups(){
    return this.ShowGroupsService.ShowGroupsList().subscribe(res=>{
      this.ShowGroupsList = res;
    })
  }

  DeleteGroupFn(id) {
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
          'Le groupe a été supprimé.',
          'success'
        );
        return this.ShowGroupsService.DeleteGroup(id).subscribe(res=>{
          this.ShowGroups();
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

  GetGroupByID(_id,libelleGroup){
    this._id = _id;
    this.GroupEdit.get('libelleGroup').setValue(libelleGroup);
  }

  ShowGroupByID(){
    return this.ShowGroupsService.ShowCordsGroup(this._id).subscribe(res=>{
      this.ShowGroupByIdVar = res;
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

  get EditC () {
    return this.GroupEdit.controls;
  }

  get AddC(){
    return this.GroupData.controls;
  }

  OnGroupAdd(){
    this.submitted = true;
    if (this.GroupData.invalid) {
      return;
    }
    console.log("okokok");
    this.ShowGroupsService.AddGroup(this.GroupData.value).subscribe(()=>{
      this.submitted=false;
      Swal.fire({
        position: 'center',
        type: 'success',
        title: "Groupe ajouté avec succés",
        showConfirmButton: false,
        timer: 4500
      })
      this.ShowGroups()
    })
  };

  ModifyGroupByID(){
    this.submitted = true;
    if (this.GroupEdit.invalid) {
      return;
    }

    this.ShowGroupsService.ModifyGroup(this._id,this.GroupEdit.value).subscribe(()=>{
     this.ShowGroups();
     this.SubmitModify();
    })
  }


}

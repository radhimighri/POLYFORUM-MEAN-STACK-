import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../../service/Admin.service";
import Swal from "sweetalert2";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-modifier-publications',
  templateUrl: './consulter-pubs.component.html',
  styleUrls: ['./consulter-pubs.component.css']
})
export class ConsulterPubsComponent implements OnInit {
  ShowPubs;
  ShowPubByIDVar;
  submitted = false;
  pubData;
  PubVar;
  fileToUpload=null;
  constructor(private PubService : AdminService, private FormBuilder : FormBuilder) { }

  ngOnInit() {
    this.pubData = this.FormBuilder.group({
      sujet: ['', Validators.required],
      texte: ['', Validators.required],
      ciblePub: ['', Validators.required],
    });

    this.ShowAllDocs();
  }

  uploadDocPub (files : FileList ){
    this.fileToUpload = files.item(0);
    return false ;
  }

  get f(){
    return this.pubData.controls;
  }

  OnPubAdd(){
    this.submitted = true;

    if (this.pubData.invalid) {
      return;
    }
    this.PubService.AddPub(this.pubData.value, this.fileToUpload).subscribe(res=>{
      this.PubVar  = res;
      this.submitted=false;
      this.pubData.reset();
      this.ShowAllDocs();
      Swal.fire({
        position: 'center',
        type: 'success',
        title: "Publié avec succés",
        showConfirmButton: false,
        timer: 4500
      })
    })
  };

  ShowAllDocs(){
    return this.PubService.ShowPubsList().subscribe(res=>{
      this.ShowPubs = res;
    })
  }

  DeletePubFn(id) {
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
          'La publication a été supprimée.',
          'success'
        );
        return this.PubService.DeletePub(id).subscribe(res=>{
          this.ShowAllDocs();
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


  GetPubID(id){
    return id;
  }

  ShowPubByID(id){
    return this.PubService.ShowCordsPub(this.GetPubID(id)).subscribe(res=>{
      this.ShowPubByIDVar = res;
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


}

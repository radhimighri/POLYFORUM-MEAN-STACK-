import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../../service/Admin.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-accounts-confirmation',
  templateUrl: './accounts-confirmation.component.html',
  styleUrls: ['./accounts-confirmation.component.css']
})
export class AccountsConfirmationComponent implements OnInit {
  UnconfirmedUser;
  AccountDeletedVar;
  UnconfirmedAccountVar;
  constructor(private UnconfirmedService: AdminService) { }

  ngOnInit() {
    this.ShowUnconfirmed();
  }

  ShowUnconfirmed(){
    return this.UnconfirmedService.ShowUnconfirmedList().subscribe(res=>{
      this.UnconfirmedUser = res;
    })
  }

  ConfirmAcc(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: 'êtes-vous sûr ?',
      text: "La confirmation sera définitive!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, Confirmer',
      cancelButtonText: 'Non, Annuler',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Confirmé!',
          'Le compte a été confirmé.',
          'success'
        );
        return this.UnconfirmedService.ConfirmAccount(id).subscribe(res=>{
          this.ShowUnconfirmed();
          console.log(res);
        })
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Annulé',
          'Confirmation est annulée',
          'error'
        )
      }
    })
  }

  UnConfirmAcc(id) {

    Swal.fire({
      title: 'êtes-vous sûr?',
      text: "La suppression sera définitive!\"!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, désapprouver!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Supprimé!',
          'Le compte à été désapprouvé',
          'success'
        );
        return this.UnconfirmedService.DeleteAccount(id).subscribe(res=>{
          this.ShowUnconfirmed();
        })
      }
    })

  }

  }

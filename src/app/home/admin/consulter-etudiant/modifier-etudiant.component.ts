import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../../service/Admin.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-modifier-etudiant',
  templateUrl: './modifier-etudiant.component.html',
  styleUrls: ['./modifier-etudiant.component.css']
})
export class ModifierEtudiantComponent implements OnInit {
  GroupsVar;
  ShowStudentVar;
  ShowStudentCordsVar;
  constructor(private StudentService : AdminService) { }

  ngOnInit() {
    this.ShowGroups();
    this.ShowStudents();
  }

  ShowGroups(){
    return this.StudentService.ShowGroupsList().subscribe(res =>{
      this.GroupsVar = res;
    })
  }

  ShowStudents(){
    return this.StudentService.ShowStudentsList().subscribe(res=>{

      console.log(res);

      this.ShowStudentVar = res;
    })
  }

  DeleteStudentAccountFn(id) {
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
        return this.StudentService.DeleteAccount(id).subscribe(res=>{
          this.ShowStudents();
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

  GetStudentID(id){
    return id;
  }

  ShowStudentCordsFn(id){
    return this.StudentService.ShowCordsStudent(this.GetStudentID(id)).subscribe(res=>{
      this.ShowStudentCordsVar = res;
    })
  }
}

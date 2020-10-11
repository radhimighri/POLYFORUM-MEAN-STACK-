import { Component, OnInit } from '@angular/core';
import {ProfService} from "../../../service/prof.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-consulter-cours-prof',
  templateUrl: './consulter-cours-prof.component.html',
  styleUrls: ['./consulter-cours-prof.component.css']
})
export class ConsulterCoursProfComponent implements OnInit {
  ShowCourseProfVar;
  ShowCourstByIDVar;
  constructor(private ShowCourseProfService :ProfService) { }

  ngOnInit() {
    this.ShowCourseForProfFn();
  }
  ShowCourseForProfFn(){
    return this.ShowCourseProfService.ShowCourseListProf().subscribe(res=>{
      this.ShowCourseProfVar = res;
    })
  }
  GetCoursID(id){
    return id;
  }

  ShowCoursByID(id){
    return this.ShowCourseProfService.ShowCordsCours(this.GetCoursID(id)).subscribe(res=>{
      this.ShowCourstByIDVar = res;
    })
  }

  DeleteCourseFn(id) {
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
          'Le cour a été supprimé.',
          'success'
        );
        return this.ShowCourseProfService.DeleteCours(id).subscribe(res=>{
          this.ShowCourseForProfFn();
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
}

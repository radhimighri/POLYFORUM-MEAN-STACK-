import { Component, OnInit } from '@angular/core';
import {EtudiantService} from "../../../service/etudiant.service";
import {FormBuilder, Validators} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-consulter-cours-student',
  templateUrl: './consulter-cours-student.component.html',
  styleUrls: ['./consulter-cours-student.component.css']
})
export class ConsulterCoursStudentComponent implements OnInit {

  GetUserInfo;
  ShowCourseStudentsVar;
  ShowCourstByIDVar;
  ShowCommentsByCourIDVar;
  CommentsData;
  submitted : Boolean;
  _id;
  constructor(private ShowCourseStudentsService : EtudiantService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.ShowCourseForStudentsFn();
    this.GetUserID();
    this.CommentsData = this.formBuilder.group({
      comm : ['',Validators.required],
      user : []
    })
  }

  ShowCourseForStudentsFn(){
    return this.ShowCourseStudentsService.ShowCourseStudent().subscribe(res=>{
      this.ShowCourseStudentsVar = res;
    })
  }
  GetCoursID(_id){
    this._id = _id;
  }

  ShowCoursByID(){
    return this.ShowCourseStudentsService.ShowCordsCours(this._id).subscribe(res=>{
      this.ShowCourstByIDVar = res;
    })
  }

  ShowCommentsByCourID(){
    return this.ShowCourseStudentsService.ShowCommentStudent(this._id).subscribe(res=>{
      this.ShowCommentsByCourIDVar = res;
    })
  }

  GetUserID(){
    var data = JSON.parse(localStorage.getItem('user'));
    this.GetUserInfo = data;
    return data;
  }

  isLoggedPerson(){
    return this.GetUserID()._id;
  }

  get GetCommentsC(){
    return this.CommentsData.controls;
  }

  UserComment(){
    this.CommentsData.value.user = this.GetUserInfo._id;
    this.submitted = true;
    if (this.CommentsData.invalid)
      return;

    return this.ShowCourseStudentsService.AddComment(this._id,this.CommentsData.value).subscribe(()=>{
      this.submitted = false;
      this.CommentsData.reset();
      this.ShowCommentsByCourID();
      this.SendCommentsAnimation();
    })
  }

  DeleteUserComment(id) {
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
          'Votre commentaire a été supprimé.',
          'success'
        );
        return this.ShowCourseStudentsService.DeleteComment(id).subscribe(()=>{
          this.ShowCommentsByCourID();
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

  SendCommentsAnimation(){

    Swal.fire({
      position: 'center',
      type: 'success',
      title: "Votre commentaire a été ajouté avec succés",
      showConfirmButton: false,
      timer: 3000
    })
  }

}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AdminService} from "../../../service/Admin.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-envoyer-res',
  templateUrl: './envoyer-res.component.html',
  styleUrls: ['./envoyer-res.component.css']
})
export class EnvoyerResComponent implements OnInit {
  ResData;
  ShowStudentsVar;
  fileToUpload=null;
  submitted;
  ResVar;
  constructor(private ResService : AdminService, private FormBuilder : FormBuilder) { }

  ngOnInit() {
    this.ResData = this.FormBuilder.group({
      res: ['', Validators.required],
      moy: ['', Validators.required],
      student: ['', Validators.required],
    });

    this.ShowStudents();
  }

  ShowStudents(){
    return this.ResService.ShowStudentsList().subscribe(res=>{
      this.ShowStudentsVar = res;
    })
  }

  uploadResRelever (files : FileList ){
    this.fileToUpload = files.item(0);
    return false ;
  }

  get f(){
    return this.ResData.controls;
  }

  OnResAdd(){
    this.submitted = true;
    if (this.ResData.invalid)
      return;
    this.ResService.SendResult(this.ResData.value, this.fileToUpload).subscribe(res=>{
      this.ResVar  = res;
      this.submitted=false;
      this.ResData.reset();
      this.SendResultsAnimation();
    })
  };

  SendResultsAnimation(){

    Swal.fire({
      position: 'center',
      type: 'success',
      title: "Resultat envoyée avec succés",
      showConfirmButton: false,
      timer: 4000
    })
  }

}

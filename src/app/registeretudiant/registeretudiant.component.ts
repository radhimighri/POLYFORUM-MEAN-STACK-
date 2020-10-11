import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {EtudiantService} from "../service/etudiant.service";
import {MustMatch} from "../home/PasswordMatch";
import {AdminService} from "../service/Admin.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import iziToast from "izitoast";

@Component({
  selector: 'app-registeretudiant',
  templateUrl: './registeretudiant.component.html',
  styleUrls: ['./registeretudiant.component.css']
})
export class RegisteretudiantComponent implements OnInit {

  EtudiantData;
  submitted = false;
  fileToUpload = null;
  EtudiantVar;
  ShowGroupeVar;
  constructor(private FormBuilder : FormBuilder, private EtudiantService : EtudiantService,private ShowGroupeService : AdminService, private router : Router) { }

  ngOnInit() {
    this.EtudiantData = this.FormBuilder.group({
        firstName:['',Validators.required],
        lastName:['',Validators.required],
        Date_Nais:['',Validators.required],
        Sexe:['',Validators.required],
        CIN:['',Validators.required],
        Group:['',Validators.required],
        matricule:['',Validators.required],
        Pays:['',Validators.required],
        Tel:['',Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        Mail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@polytechnicien.tn+$')]]
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }

    );

    this.ShowGroupe();

  }

  get f(){
    return this.EtudiantData.controls;
  }

  uploadImage (files : FileList ){
    this.fileToUpload = files.item(0);
    return false ;
  }

  OnStudentSignUp(){
    this.submitted = true;

    if (this.EtudiantData.invalid) {
      return;
    }
    this.EtudiantService.SignupStud(this.EtudiantData.value, this.fileToUpload).subscribe(res=>{
      //this.EtudiantVar  = res;
      if(JSON.parse(JSON.stringify(res)).status === 'Well') {
        let timerInterval;
        Swal.fire({
          title: "Compte créé avec succès il faut l'approuver par l'administration pour pouvoir y acceder",
          html: '',
          timer: 4000,
          onBeforeOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {
              Swal.getContent().querySelector('strong')
                .textContent = String(Swal.getTimerLeft())
            }, 100)
          },
          onClose: () => {
            clearInterval(timerInterval);
            this.router.navigate(['/']);
            this.submitted=false;
            this.EtudiantData.reset();
          }
        })
      }
      else if(JSON.parse(JSON.stringify(res)).status === 'error2')
      {
        iziToast.info({
          title: "Mail deja utilisé !",
          message: '',
          position: 'topLeft'
        });
      }

    })
  };

  ShowGroupe(){
    return this.ShowGroupeService.ShowGroupsList().subscribe(res=>{
      this.ShowGroupeVar = res;
    })
  }
}

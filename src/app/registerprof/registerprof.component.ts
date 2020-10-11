import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AdminService} from "../service/Admin.service";
import {MustMatch} from "../home/PasswordMatch";
import Swal from "sweetalert2";
import {ProfService} from "../service/prof.service";
import iziToast from "izitoast";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registerprof',
  templateUrl: './registerprof.component.html',
  styleUrls: ['./registerprof.component.css']
})
export class RegisterprofComponent implements OnInit {
  ProfData;
  submitted = false;
  fileToUpload = null;
  ProfVar;
  ShowDeptVar;
  constructor(private FormBuilder : FormBuilder, private ProfService : ProfService,private ShowDepartmentService : AdminService,private router: Router) { }

  ngOnInit() {
    this.ProfData = this.FormBuilder.group({
        firstName:['',Validators.required],
        lastName:['',Validators.required],
        Date_Nais:['',Validators.required],
        Sexe:['',Validators.required],
        CIN:['',Validators.required],
        nomDepartement:['',Validators.required],
        Pays:['',Validators.required],
        Tel:['',Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        Mail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@polytechnicien.tn+$')]]
      },
      {validator: MustMatch('password', 'confirmPassword')}
    );


    this.ShowDepartment();

  }

  get f(){
    return this.ProfData.controls;
  }

  uploadImage (files : FileList ){
    this.fileToUpload = files.item(0);
    return false ;
  }

  OnProfSignUp(){
    this.submitted = true;

    if (this.ProfData.invalid) {
      return;
    }
    this.ProfService.SignupProf(this.ProfData.value, this.fileToUpload).subscribe(res=>{
      this.ProfVar  = res;
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
            this.submitted=false;
            this.ProfData.reset();
            this.router.navigate(['/']);
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

  ShowDepartment(){
    return this.ShowDepartmentService.ShowDepartmentsList().subscribe(res=>{
      this.ShowDeptVar = res;
    })
  }
}

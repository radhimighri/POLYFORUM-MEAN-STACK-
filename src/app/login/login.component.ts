import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {EtudiantService} from "../service/etudiant.service";
import {Router} from "@angular/router";
import iziToast from "izitoast";
import {AdminService} from "../service/Admin.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  LoginForm : FormGroup;
  constructor(private formBuilder: FormBuilder, private  EtudiantService : EtudiantService, private router : Router, private AdminService: AdminService) { }

  ngOnInit() {
    this.LoginForm = this.formBuilder.group({
      Mail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@polytechnicien.tn+$')]],
        password: ['', [Validators.required, Validators.minLength(6)]],});
  }

  // convenience getter for easy access to form fields
  get f() { return this.LoginForm.controls; }

  LoginFn() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.LoginForm.invalid) {
      return;
    }
    return this.AdminService.Login(this.LoginForm.value).subscribe(res=>{
      console.log(res);
      this.submitted = false;
      if(JSON.parse(JSON.stringify(res)).status === 'LoggedIn') {
        let timerInterval;
        Swal.fire({
          title: 'Logging In...',
          html: '',
          timer: 2000,
          onBeforeOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {
              Swal.getContent().querySelector('strong')
                .textContent = String(Swal.getTimerLeft())
            }, 100)
          },
          onClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          if (
            // Read more about handling dismissals
            result.dismiss === Swal.DismissReason.timer
          ) {
            localStorage.setItem('token',JSON.parse(JSON.stringify(res)).data.token);
            localStorage.setItem('user',JSON.stringify(JSON.parse(JSON.stringify(res)).data.user));
            localStorage.setItem('isLogged','1');
            console.log(JSON.parse(JSON.stringify(res)).data.user);
            this.router.navigate(['/home']);
            setTimeout(()=>window.location.reload(),1000);
          }
        })
      }
      else if(JSON.parse(JSON.stringify(res)).status === 'WrongPW')
      {
        iziToast.warning({
          title: 'Mot de passe incorrect!',
          message: '',
          position: 'topLeft'
        });
      }
      else if(JSON.parse(JSON.stringify(res)).status === 'UnconfirmedAcc')
      {
        iziToast.info({
          title: "Votre compte n'est pas encore confirmé!",
          message: '',
          position: 'topLeft'
        });
      }
      else if(JSON.parse(JSON.stringify(res)).status === 'WrongMail')
      {
        iziToast.warning({
          title: 'E-mail incorrect!',
          message: '',
          position: 'topLeft'
        });
      }

      //this.StudentFormSignIn.reset();
    })

  }


}

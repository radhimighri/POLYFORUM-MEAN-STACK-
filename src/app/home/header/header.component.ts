import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ProfService} from "../../service/prof.service";
import {AdminService} from "../../service/Admin.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  GetInfo;
  UnconfirmedProfCountVar;
  UnconfirmedStudentCountVar;
  constructor(private router: Router,private AdminService : AdminService) { }

  ngOnInit() {
    this.GetUserID();
    this.CountUnconfirmedProfs();
    this.CountUnconfirmedStudents();
  }


  OnLogout(){
    this.router.navigate(['/']);
    localStorage.clear();
  }

  get isProf() {
    return this.GetUserID().usertype =='Prof';
  }

  get isUser(){
    return this.GetUserID().usertype == 'Student';
  }

  GetUserID(){
    var data = JSON.parse(localStorage.getItem('user'));
    this.GetInfo = data;
    return data;
  }

  CountUnconfirmedProfs(){
    return this.AdminService.ShowUnconfirmedProfList().subscribe(res=>{
      this.UnconfirmedProfCountVar = res;
    })
  }

  CountUnconfirmedStudents(){
    return this.AdminService.ShowUnconfirmedList().subscribe(res=>{
      this.UnconfirmedStudentCountVar = res;
    })
  }

  onClick(){
    this.CountUnconfirmedProfs();
    this.CountUnconfirmedStudents();
  }

}

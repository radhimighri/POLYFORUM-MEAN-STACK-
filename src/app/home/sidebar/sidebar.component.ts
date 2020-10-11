import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../service/Admin.service";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {

  GetInfo;
  CountUsersVar;
  CountProfVar;
  CountStudentsVar;
  constructor(private AdminService : AdminService) { }

  ngOnInit() {
  this.GetUserToken();
  this.GetUserID();
  this.CountUsersFn();
  this.CountProfsFn();
  this.CountStudentFn();
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

  GetUserToken(){
    return this.GetInfo = localStorage.getItem('token');
  }

  CountUsersFn(){
    return this.AdminService.GetAllUsers().subscribe(res=>{
      this.CountUsersVar = res;
    })
  }

  CountProfsFn(){
    return this.AdminService.ShowProfList().subscribe(res=>{
      this.CountProfVar = res;
    })
  }

  CountStudentFn(){
    return this.AdminService.ShowStudentsList().subscribe(res=>{
      this.CountStudentsVar = res;
    })
  }
}

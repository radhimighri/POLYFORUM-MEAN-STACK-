import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  GetUserInfo;
  constructor() { }

  ngOnInit() {
    this.GetUserToken();
  }

  GetUserToken(){
    return this.GetUserInfo = localStorage.getItem('ViewModal');
  }

  OnRemoveModal(){
    localStorage.setItem('ViewModal','1');
  }


}

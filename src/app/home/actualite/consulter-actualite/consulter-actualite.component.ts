import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../../service/Admin.service";

@Component({
  selector: 'app-consulter-actualite',
  templateUrl: './consulter-actualite.component.html',
  styleUrls: ['./consulter-actualite.component.css']
})
export class ConsulterActualiteComponent implements OnInit {

  PubVar;
  constructor(private ServiceAdmin : AdminService) { }

  ngOnInit() {
    this.ShowPubsFn();
  }

  ShowPubsFn(){
    return this.ServiceAdmin.ShowPubsList().subscribe(res=>{
      this.PubVar = res;
    })
  }

}

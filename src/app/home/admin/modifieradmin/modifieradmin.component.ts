import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../../service/Admin.service";

@Component({
  selector: 'app-modifieradmin',
  templateUrl: './modifieradmin.component.html',
  styleUrls: ['./modifieradmin.component.css']
})
export class ModifieradminComponent implements OnInit {

  ModifyAdminVar;
  constructor(private ModifierAdminService : AdminService) { }

  ngOnInit() {
    this.AfficherMAJAdminFn();
  }

  AfficherMAJAdminFn(){
    return this.ModifierAdminService.ShowAdminCords().subscribe(res=>{
      this.ModifyAdminVar = res;
    })
  }

}

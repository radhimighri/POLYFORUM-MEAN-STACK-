import { Component, OnInit } from '@angular/core';
import {EtudiantService} from "../../../service/etudiant.service";

@Component({
  selector: 'app-consulter-res',
  templateUrl: './consulter-res.component.html',
  styleUrls: ['./consulter-res.component.css']
})
export class ConsulterResComponent implements OnInit {

  GetInfo;
  GetResultVar;
  GetFileVar;
  constructor(private EtudiantSerivce : EtudiantService) { }

  ngOnInit() {
    this.GetResults();
  }

  GetUserID(){
    var data = JSON.parse(localStorage.getItem('user'));
    this.GetInfo = data;
    return data;
  }

  GetResults(){
    console.log(this.GetUserID()._id);
    return this.EtudiantSerivce.GetResults(this.GetUserID()._id).subscribe(res=>{
      console.log('done');
      this.GetResultVar = res;
      console.log(this.GetResultVar);
    })
  }

  GetRelever(){
    window.open(
      '/assets/Uploads/Results/'+this.GetResultVar.relever,
      '_blank' // <- This is what makes it open in a new window.
    );
  }


}

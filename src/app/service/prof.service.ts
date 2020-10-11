import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfService {
baseURL = environment.baseURL;
  constructor(private http : HttpClient ) { }

  ShowCourseListProf(){
    return this.http.get(this.baseURL+'/cour/selectCourse')
  }

  ShowCommentProf(){
    return this.http.get(this.baseURL+'/comment/commentView');
  }

  DeleteCours(_id : String){
    return this.http.delete(this.baseURL+'/cour/deleteCourse/'+_id)
  }


  SignupProf(Prof,fileUpload){
    let ProfData = new FormData();
    ProfData.append('firstName',''+Prof.firstName);
    ProfData.append('lastName',''+Prof.lastName);
    ProfData.append('Date_Nais',''+Prof.Date_Nais);
    ProfData.append('Sexe',''+Prof.Sexe);
    ProfData.append('CIN',''+Prof.CIN);
    ProfData.append('nomDepartement',''+Prof.nomDepartement);
    ProfData.append('Pays',''+Prof.Pays);
    ProfData.append('Tel',''+Prof.Tel);
    ProfData.append('Mail',''+Prof.Mail);
    ProfData.append('password',''+Prof.password);
    ProfData.append('photo',fileUpload,fileUpload.name);

    return this.http.post(this.baseURL+'/prof/signUp',ProfData);

  }


  ShowCordsCours(_id: String){
    return this.http.get(this.baseURL+'/cours/ViewCourByID/'+_id);
  }
}

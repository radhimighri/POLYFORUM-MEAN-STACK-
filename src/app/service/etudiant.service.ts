import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  baseURL = environment.baseURL;

  constructor(private http: HttpClient) {
  }

  ShowCourseStudent() {
    return this.http.get(this.baseURL + '/cour/selectCourseForStudents')
  }

  ShowCommentStudent(_id: String) {
    return this.http.get(this.baseURL + '/comment/commentView/' + _id);
  }

  SignupStud(Etudiant, fileUpload) {
    let EtudiantData = new FormData();
    EtudiantData.append('firstName', '' + Etudiant.firstName);
    EtudiantData.append('lastName', '' + Etudiant.lastName);
    EtudiantData.append('Date_Nais', '' + Etudiant.Date_Nais);
    EtudiantData.append('Sexe', '' + Etudiant.Sexe);
    EtudiantData.append('CIN', '' + Etudiant.CIN);
    EtudiantData.append('Group', '' + Etudiant.Group);
    EtudiantData.append('matricule', '' + Etudiant.matricule);
    EtudiantData.append('Pays', '' + Etudiant.Pays);
    EtudiantData.append('Tel', '' + Etudiant.Tel);
    EtudiantData.append('Mail', '' + Etudiant.Mail);
    EtudiantData.append('password', '' + Etudiant.password);
    EtudiantData.append('photo', fileUpload, fileUpload.name);

    return this.http.post(this.baseURL + '/student/signUp', EtudiantData);

  }


  ShowCordsCours(_id: String) {
    return this.http.get(this.baseURL + '/cour/CourViewbyID/' + _id);
  }

  GetResults(_id: String) {
    return this.http.get(this.baseURL + '/resultt/ViewRes/' + _id)
  }


  AddComment(_id : String, data){
    return this.http.post(this.baseURL+'/comment/addComment/'+_id,data);
  }

  DeleteComment(_id: String){
    return this.http.delete(this.baseURL+'/comment/deleteComment/'+_id);
  }

}

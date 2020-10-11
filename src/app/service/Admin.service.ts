import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
baseURL = environment.baseURL;
  constructor(private http: HttpClient) { }

  ShowProfList(){
    return this.http.get(this.baseURL+'/prof/selectAllProfs');
  }


  ShowStudentsList(){
    return this.http.get(this.baseURL+'/student/selectAllStudents')
  }

  ShowAdminList(){
    return this.http.get(this.baseURL+'/admin/ShowSuperUsers')
  }

  ShowGroupsList(){
    return this.http.get(this.baseURL+'/group/selectAllGroups')
  }

  ShowDepartmentsList(){
    return this.http.get(this.baseURL+'/dep/selectAllDeps')
  }

  ShowPubsList(){
    return this.http.get(this.baseURL+'/doc/selectDocs')
  }

  ShowUnconfirmedList(){
    return this.http.get(this.baseURL+'/student/ShowUnconfirmedUsers')
  }

  ShowUnconfirmedProfList(){
    return this.http.get(this.baseURL+'/prof/ShowUnconfirmedUsers')
  }

  DeleteAccount(_id : String){
    return this.http.delete(this.baseURL+'/admin/deleteById/'+_id)
}

  DeleteGroup(_id : String){
    return this.http.delete(this.baseURL+'/group/deleteGroup/'+_id)
  }

  DeletePub(_id : String){
    return this.http.delete(this.baseURL+'/doc/deleteDoc/'+_id)
  }

  DeleteDep(_id : String){
    return this.http.delete(this.baseURL+'/dep/deleteDep/'+_id)
  }

  ViewPubs(){
    return this.http.get(this.baseURL+'/doc/')
  }

  ShowAdminCords(){
    return this.http.get(this.baseURL+'/admin/profilView/5d1490871a95232f9822ec5e')
  }

  ConfirmAccount(_id : String){
    return this.http.put(this.baseURL+'/student/confirmRegistration/'+_id,_id);
  }


  ConfirmAccountProf(_id : String){
    return this.http.put(this.baseURL+'/prof/confirmRegistration/'+_id,_id);
  }

  ShowCordsProf(_id: String){
    return this.http.get(this.baseURL+'/prof/profilView/'+_id);
  }

  ShowCordsStudent(_id: String){
    return this.http.get(this.baseURL+'/student/profilView/'+_id);
  }

  ShowCordsAdmin(_id: String){
    return this.http.get(this.baseURL+'/admin/profilView/'+_id);
  }

  ShowCordsDept(_id: String){
    return this.http.get(this.baseURL+'/dep/ViewDeptsByID/'+_id);
  }

  ShowCordsPub(_id: String){
    return this.http.get(this.baseURL+'/doc/docViewbyID/'+_id);
  }

  ShowCordsGroup(_id: String){
    return this.http.get(this.baseURL+'/group/groupViewbyID/'+_id);
  }

  AddAdministrator(data){
    return this.http.post(this.baseURL+'/admin/register',data);
  }

  Login(data){
    return this.http.post(this.baseURL+'/admin/signIn',data);
  }

  AddPub(Pub,FileToUpload){
    let PubData = new FormData();
    PubData.append('sujet',''+Pub.sujet);
    PubData.append('texte',''+Pub.texte);
    PubData.append('ciblePub',''+Pub.ciblePub);
    PubData.append('docPub',FileToUpload,FileToUpload.name);

    return this.http.post(this.baseURL+'/doc/addDoc',PubData);
  }

  ModifyAdminn(_id: String,data){
    return this.http.put(this.baseURL+'/updateById/'+_id,data);
  }

  ModifyGroup(_id: String,data){
    return this.http.put(this.baseURL+'/group/updateGroup/'+_id,data);
  }

  ModifyDept(_id : String,data){
    return this.http.put(this.baseURL+'/dep/updateDep/'+_id,data);
  }

  AddGroup(data){
    return this.http.post(this.baseURL+'/group/addGroup',data);
  }

  AddDept(data){
    return this.http.post(this.baseURL+'/dep/addDep',data);
  }

  SendResult(Result,FileToUpload){
    let ResData = new FormData();
    ResData.append('res',''+Result.res);
    ResData.append('moy',''+Result.moy);
    ResData.append('student',''+Result.student);
    ResData.append('relever',FileToUpload,FileToUpload.name);

    return this.http.post(this.baseURL+'/result/SendRes',ResData);
  }

  UpdateProf(_id, data) {
    return this.http.put(this.baseURL + '/prof/updateById/'+ _id, data)
  }

  uploads(files) {
    let formData = new FormData();
    formData.append("photo", files);
    return this.http.post(this.baseURL + '/prof/UploadUserImage', formData)

  }

  GetAllUsers(){
    return this.http.get(this.baseURL+'/admin/GetAllUsers');
  }


  // ShowStudentsGroupList(){
  //   return this.http.get(this.baseURL+'/student/SelectByID')
  // }
}

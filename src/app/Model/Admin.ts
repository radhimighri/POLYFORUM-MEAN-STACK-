export class admin{
  private _firstName : String;
  private _lastName : String;
  private _Date_Nais : Date;
  private _Sexe : String;
  private _Pays : String;
  private _Tel : String;
  private _Mail : String;
  private _photo: String;

  constructor(firstName: String, lastName: String, Date_Nais: Date, nomDepartement: String, Sexe: String, Pays: String, Tel: String, Mail: String, photo: String, confirme: String) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._Date_Nais = Date_Nais;
    this._Sexe = Sexe;
    this._Pays = Pays;
    this._Tel = Tel;
    this._Mail = Mail;
    this._photo = photo;
  }

  get firstName(): String {
    return this._firstName;
  }

  set firstName(value: String) {
    this._firstName = value;
  }

  get lastName(): String {
    return this._lastName;
  }

  set lastName(value: String) {
    this._lastName = value;
  }

  get Date_Nais(): Date {
    return this._Date_Nais;
  }

  set Date_Nais(value: Date) {
    this._Date_Nais = value;
  }


  get Sexe(): String {
    return this._Sexe;
  }

  set Sexe(value: String) {
    this._Sexe = value;
  }

  get Pays(): String {
    return this._Pays;
  }

  set Pays(value: String) {
    this._Pays = value;
  }

  get Tel(): String {
    return this._Tel;
  }

  set Tel(value: String) {
    this._Tel = value;
  }

  get Mail(): String {
    return this._Mail;
  }

  set Mail(value: String) {
    this._Mail = value;
  }

  get photo(): String {
    return this._photo;
  }

  set photo(value: String) {
    this._photo = value;
  }

}

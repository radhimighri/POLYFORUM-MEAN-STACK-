export class cours{
  private _libelle: String;
  private _description: String;
  private _datePub: Date;
  private _fichier: String;
  private _prof : String;
  private _group: String;

  constructor(libelle: String, description: String, datePub: Date, fichier: String, prof: String, group: String) {
    this._libelle = libelle;
    this._description = description;
    this._datePub = datePub;
    this._fichier = fichier;
    this._prof = prof;
    this._group = group;
  }

  get libelle(): String {
    return this._libelle;
  }

  set libelle(value: String) {
    this._libelle = value;
  }

  get description(): String {
    return this._description;
  }

  set description(value: String) {
    this._description = value;
  }

  get datePub(): Date {
    return this._datePub;
  }

  set datePub(value: Date) {
    this._datePub = value;
  }

  get fichier(): String {
    return this._fichier;
  }

  set fichier(value: String) {
    this._fichier = value;
  }

  get prof(): String {
    return this._prof;
  }

  set prof(value: String) {
    this._prof = value;
  }

  get group(): String {
    return this._group;
  }

  set group(value: String) {
    this._group = value;
  }
}

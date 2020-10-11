export class Docs{
  private _sujet : String;
  private _texte : String;
  private _datePub : Date;
  private _ciblePub : String;
  private _docPub : String;

  constructor(sujet: String, texte: String, datePub: Date, ciblePub: String, docPub: String) {
    this._sujet = sujet;
    this._texte = texte;
    this._datePub = datePub;
    this._ciblePub = ciblePub;
    this._docPub = docPub;
  }

  get sujet(): String {
    return this._sujet;
  }

  set sujet(value: String) {
    this._sujet = value;
  }

  get texte(): String {
    return this._texte;
  }

  set texte(value: String) {
    this._texte = value;
  }

  get datePub(): Date {
    return this._datePub;
  }

  set datePub(value: Date) {
    this._datePub = value;
  }

  get ciblePub(): String {
    return this._ciblePub;
  }

  set ciblePub(value: String) {
    this._ciblePub = value;
  }

  get docPub(): String {
    return this._docPub;
  }

  set docPub(value: String) {
    this._docPub = value;
  }
}

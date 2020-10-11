export class Departments{
  private _libelleDep : String;
  private _chef : String;

  constructor(libelleDep: String, chef: String) {
    this._libelleDep = libelleDep;
    this._chef = chef;
  }

  get libelleDep(): String {
    return this._libelleDep;
  }

  set libelleDep(value: String) {
    this._libelleDep = value;
  }

  get chef(): String {
    return this._chef;
  }

  set chef(value: String) {
    this._chef = value;
  }
}

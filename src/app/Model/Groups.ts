export class Group{
  private _libelleGroup : String;

  constructor(libelleGroup: String) {
    this._libelleGroup = libelleGroup;
  }

  get libelleGroup(): String {
    return this._libelleGroup;
  }

  set libelleGroup(value: String) {
    this._libelleGroup = value;
  }
}

import Model from './Model.js';

export default class Television extends Model {

  static table = "televisions.television";
  static primary = ["id"];
}

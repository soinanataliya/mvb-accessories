import { Knex } from "knex";

export interface Accessory {
  id: string;
  name?: string;
  price?: string;
  src?: string;
  category?: string;
}

export default class AccessoriesRepository {
  private dbConnection: Knex;

  constructor(dbConnection: Knex) {
    this.dbConnection = dbConnection
  }

  getAll() {
    return this.dbConnection("acc").select();
  }

  getById(id: string) {
    return this.dbConnection("acc").select().where("id", id);
  }

  deleteById(id: string) {
    return this.dbConnection("acc").where("id", id).del("id");
  }

  addNew(data: Accessory) {
    return this.dbConnection("acc").insert(data);
  }
}

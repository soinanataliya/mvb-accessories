import { Knex } from "knex";
import { ICategory } from "./types.js";

export default class CategoriesRepository {
  private dbConnection: Knex;

  constructor(dbConnection: Knex) {
    this.dbConnection = dbConnection
  }

  getAll() {
    return this.dbConnection("categories_dictionary").select();
  }

  getById(id: string) {
    return this.dbConnection("categories_dictionary").select().where("id", id);
  }

  deleteById(id: string) {
    return this.dbConnection("categories_dictionary").where("id", id).del("id");
  }

  addNew(data: ICategory) {
    return this.dbConnection("categories_dictionary").insert(data);
  }
}

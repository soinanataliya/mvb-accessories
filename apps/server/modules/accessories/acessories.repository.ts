import { v4 as uuidv4 } from "uuid";

export class Accessory {
  id: string;
  name?: string;
  price?: string;

  constructor({
    id,
    name,
    price,
  }: {
    id: string;
    name?: string;
    price?: string;
  }) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

export default class AccessoriesRepository {
  static createAccessory(name: string, price: string) {
    const id = uuidv4();
    const newAccessory = new Accessory({
      id,
      name,
      price,
    });
    return newAccessory;
  }
}

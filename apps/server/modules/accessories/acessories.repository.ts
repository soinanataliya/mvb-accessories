import { v4 as uuidv4 } from "uuid";

export class Accessory {
  id: string;
  name?: string;
  price?: string;
  src?: string;

  constructor({
    id,
    name,
    price,
    src,
  }: {
    id: string;
    name?: string;
    price?: string;
    src?: string;
  }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.src = src;
  }
}

export default class AccessoriesRepository {
  static createAccessory(name: string, price: string, ext: string) {
    const id = uuidv4();
    const newAccessory = new Accessory({
      id,
      name,
      price,
      src: `${id}.${ext}`,
    });
    return newAccessory;
  }
}

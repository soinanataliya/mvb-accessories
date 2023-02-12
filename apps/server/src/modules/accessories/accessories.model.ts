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

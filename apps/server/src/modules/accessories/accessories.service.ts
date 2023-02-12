import { Injectable } from '@nestjs/common';
import { Accessory } from './accessories.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AccessoriesService {
  accessories: Accessory[] = [];

  insertAccessory(src: string, name: string, price?: string): Accessory {
    const id = uuidv4();
    const newAccessory = new Accessory({
      id,
      name,
      price,
    });
    return newAccessory;
  }
}

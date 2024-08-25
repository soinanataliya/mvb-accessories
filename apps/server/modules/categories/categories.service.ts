import { v4 as uuidv4 } from "uuid";
import CategoriesRepository from "./categories.repository.js";

export default class CategoriesService {
  private categoriesRepository: CategoriesRepository;

  constructor(categoriesRepository: CategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async createCategory(categoryData: { name: string }) {
    const id = uuidv4();
    const { name } = categoryData;
    const newAccessory = {
      id,
      name,
    };
    return this.categoriesRepository.addNew(newAccessory);
  }

  getAllCategories() {
    return this.categoriesRepository.getAll();
  }

  async deleteCategory(id: string) {
    return this.categoriesRepository.deleteById(id);
  }
}

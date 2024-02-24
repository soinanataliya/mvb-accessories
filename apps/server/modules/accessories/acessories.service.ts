import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import AccessoriesRepository, { Accessory } from "./acessories.repository.js";
import { pipeline } from "stream";
import util from "util";
import { MultipartFile } from "@fastify/multipart";

const EXTENTION_BY_FILE_TYPE: Record<string, string | undefined> = {
    "image/png": "png",
    "image/jpeg": "jpeg",
};

export default class AccessoriesService {
    private accessoriesRepository: AccessoriesRepository;

    constructor(accessoriesRepository: AccessoriesRepository) {
        this.accessoriesRepository = accessoriesRepository;
    }

    async createAccessory(
        accessoryData: { name: string; price: string },
        file: MultipartFile,
        fileTypeValue: string,
    ) {
        const id = uuidv4();
        const { name, price } = accessoryData;
        const ext = EXTENTION_BY_FILE_TYPE[fileTypeValue] ?? "";
        const newAccessory = {
            id,
            name,
            price,
            src: `${id}.${ext}`,
        };

        const pump = util.promisify(pipeline);

        await pump(
            file.file,
            fs.createWriteStream(
                `./uploads/${newAccessory.id}${fileTypeValue && "."}${EXTENTION_BY_FILE_TYPE[fileTypeValue]
                }`
            )
        );
        return this.accessoriesRepository.addNew(newAccessory)
    }

    getAllAccessories() {
        return this.accessoriesRepository.getAll();
    }

    async deleteAccessory(id: string) {
        const result = await this.accessoriesRepository.getById(id);
        const fileName = result[0].src;
        if (fileName) fs.unlinkSync(`./uploads/${fileName}`);
        return this.accessoriesRepository.deleteById(id);
    }

}

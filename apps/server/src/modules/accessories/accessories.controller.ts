import { Body, Controller, Delete, Get, Inject, Post } from '@nestjs/common';
import { DbConnectionService } from '../dbConnection/dbConnection.service';
import { AccessoriesService } from './accessories.service';
@Controller('accessories')
export class AccessoriesController {
  dbConnectionService: DbConnectionService;
  accessoriesService: AccessoriesService;
  constructor(
    @Inject(DbConnectionService) dbConnectionService: DbConnectionService,
    @Inject(AccessoriesService) accessoriesService: AccessoriesService,
  ) {
    this.dbConnectionService = dbConnectionService;
    this.accessoriesService = accessoriesService;
  }

  @Post()
  addAccessory(@Body('name') name: string, @Body('price') price: string): any {
    const generatedData = this.accessoriesService.insertAccessory(name, price);

    this.dbConnectionService
      .connection('acc')
      .insert(generatedData)
      .then((result) => {
        return result;
      });
  }

  @Get()
  findAll(): Promise<unknown> {
    return this.dbConnectionService.connection('acc').select();
  }

  @Delete()
  deleteAccessory(@Body('id') id: string): string {
    try {
      const deletingId = id;
      this.dbConnectionService.connection('acc').del().where({
        id: deletingId,
      });

      return `id ${deletingId} удален`;
    } catch (error) {
      return error.message;
    }
  }
}

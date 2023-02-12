import { Module } from '@nestjs/common';
import { DbConnectionModule } from '../dbConnection/dbConnection.module';
import { AccessoriesController } from './accessories.controller';
import { AccessoriesService } from './accessories.service';

@Module({
  imports: [DbConnectionModule],
  controllers: [AccessoriesController],
  providers: [AccessoriesService],
})
export class AccessoriesModule {}

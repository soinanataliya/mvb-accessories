import { Module } from '@nestjs/common';
import { AccessoriesModule } from './modules/accessories';
import { DbConnectionModule } from './modules/dbConnection/dbConnection.module';

@Module({
  imports: [AccessoriesModule, DbConnectionModule],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { DbConnectionService } from './dbConnection.service';

@Module({
  providers: [DbConnectionService],
  exports: [DbConnectionService],
})
export class DbConnectionModule {}

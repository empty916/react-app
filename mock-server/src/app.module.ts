import { Module } from '@nestjs/common';
import { AppController } from './controller/app/app.controller';
import demoController from './controller/demo';
import { AppService } from './service/app.service';

@Module({
  imports: [],
  controllers: [AppController, demoController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './controller/app/app.controller';
import demoController from './controller/demo';
import { AppService } from './service/app.service';
import { CatsController } from './controller/cats/cats.controller';

@Module({
  imports: [],
  controllers: [demoController, CatsController],
  providers: [AppService],
})
export class AppModule {}

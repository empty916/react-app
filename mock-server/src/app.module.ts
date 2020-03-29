import { Module } from '@nestjs/common';
import { AppService } from './service/app.service';
import { CatsController } from './controller/cats/cats.controller';
import { AppController } from './controller/app/app.controller';
import { DemoController } from './controller/demo/demo.controller';

@Module({
  imports: [],
  controllers: [CatsController, AppController, DemoController],
  providers: [AppService],
})
export class AppModule {}

import { Test, TestingModule } from '@nestjs/testing';
import { DemoController } from './demo.controller';

describe('Demo Controller', () => {
  let controller: DemoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DemoController],
    }).compile();

    controller = module.get<DemoController>(DemoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

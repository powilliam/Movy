import { Test, TestingModule } from '@nestjs/testing';
import { SharedlistsController } from './sharedlists.controller';

describe('Sharedlists Controller', () => {
  let controller: SharedlistsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SharedlistsController],
    }).compile();

    controller = module.get<SharedlistsController>(SharedlistsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

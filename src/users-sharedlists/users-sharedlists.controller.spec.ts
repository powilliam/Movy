import { Test, TestingModule } from '@nestjs/testing';
import { UsersSharedlistsController } from './users-sharedlists.controller';

describe('UsersSharedlists Controller', () => {
  let controller: UsersSharedlistsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersSharedlistsController],
    }).compile();

    controller = module.get<UsersSharedlistsController>(UsersSharedlistsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

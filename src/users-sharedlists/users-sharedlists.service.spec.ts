import { Test, TestingModule } from '@nestjs/testing';
import { UsersSharedlistsService } from './users-sharedlists.service';

describe('UsersSharedlistsService', () => {
  let service: UsersSharedlistsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersSharedlistsService],
    }).compile();

    service = module.get<UsersSharedlistsService>(UsersSharedlistsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

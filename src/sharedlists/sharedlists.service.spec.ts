import { Test, TestingModule } from '@nestjs/testing';
import { SharedlistsService } from './sharedlists.service';

describe('SharedlistsService', () => {
  let service: SharedlistsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SharedlistsService],
    }).compile();

    service = module.get<SharedlistsService>(SharedlistsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

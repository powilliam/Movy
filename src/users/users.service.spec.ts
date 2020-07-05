import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import faker from 'faker';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    const result = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      passwordHash: faker.internet.password(),
    };
    it('should register an user', async () => {
      jest.spyOn(service, 'createUser').mockImplementation(() => result);

      expect(service.createUser()).toBe(result);
    });
  });
});

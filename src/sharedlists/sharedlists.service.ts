import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sharedlist } from './sharedlist.entity';
import { randomBytes } from 'crypto';
import { User } from 'src/users/user.entity';
import { CreateSharedlistDTO } from './dto/create-sharedlist.dto';

@Injectable()
export class SharedlistsService {
  constructor(
    @InjectRepository(Sharedlist)
    private readonly sharedlistRepository: Repository<Sharedlist>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async searchSharedlist(sharedlistId: string): Promise<Sharedlist> {
    return await this.sharedlistRepository.findOne({
      where: { id: sharedlistId },
      relations: ['creator', 'participants', 'movies'],
    });
  }

  async createSharedlist({
    name,
    creatorId,
  }: CreateSharedlistDTO): Promise<Sharedlist> {
    const creator = await this.userRepository.findOne({
      where: { id: creatorId },
    });
    if (!creator) {
      throw new NotAcceptableException(
        'Cannot create a shared list related an invalid creator id',
      );
    }

    const accessCode = randomBytes(4).toString('hex');

    const sharedlist = this.sharedlistRepository.create({
      name,
      accessCode,
      creator,
      participants: [creator],
    });
    await this.sharedlistRepository.save(sharedlist);

    return sharedlist;
  }

  async deleteSharedlist(sharedlistId: string): Promise<void> {
    await this.sharedlistRepository.delete({ id: sharedlistId });
  }
}

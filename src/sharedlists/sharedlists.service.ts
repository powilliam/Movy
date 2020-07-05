import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sharedlist } from './sharedlist.entity';
import { randomBytes } from 'crypto';
import { User } from 'src/users/user.entity';

export interface CreateSharedlist {
  name: string;
  creator: User;
}

@Injectable()
export class SharedlistsService {
  constructor(
    @InjectRepository(Sharedlist)
    private readonly sharedlistRepository: Repository<Sharedlist>,
  ) {}

  async searchSharedlist(sharedlistId: string): Promise<Sharedlist> {
    return await this.sharedlistRepository.findOne({
      where: { id: sharedlistId },
      relations: ['creator', 'participants', 'movies'],
    });
  }

  async createSharedlist({
    name,
    creator,
  }: CreateSharedlist): Promise<Sharedlist> {
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

import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Sharedlist } from '../sharedlists/sharedlist.entity';
import { JoinSharedlistDTO } from './dto/join-sharedlist.dto';
import { LeaveSharedlistDTO } from './dto/leave-sharedlist.dto';

@Injectable()
export class UsersSharedlistsService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Sharedlist)
    private readonly sharedlistRepository: Repository<Sharedlist>,
  ) {}

  async joinSharedlist({
    userId,
    sharedlistId,
  }: JoinSharedlistDTO): Promise<Sharedlist> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("User doesn't exists");
    }

    const sharedlist = await this.sharedlistRepository.findOne({
      where: { id: sharedlistId },
      relations: ['participants', 'creator'],
    });
    if (!sharedlist) {
      throw new NotFoundException("Shared list doesn't exists");
    }

    const isCreator = sharedlist.creator.id === user.id;
    if (isCreator) {
      throw new ConflictException('User already is the creator');
    }

    const isParticipating = sharedlist.participants.filter(
      participant => participant.id === user.id,
    );
    if (isParticipating.length > 0) {
      throw new ConflictException(
        'Cannot join in a shared lists that user already is participating',
      );
    }

    sharedlist.participants.push(user);
    await this.sharedlistRepository.save(sharedlist);

    return sharedlist;
  }

  async leaveSharedlist({
    userId,
    sharedlistId,
  }: LeaveSharedlistDTO): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("User doesn't exists");
    }

    const sharedlist = await this.sharedlistRepository.findOne({
      where: { id: sharedlistId },
      relations: ['participants', 'creator'],
    });
    if (!sharedlist) {
      throw new NotFoundException("Shared list doesn't exists");
    }

    const isCreator = sharedlist.creator.id === user.id;
    if (isCreator) {
      throw new ConflictException('Cannot leave the user that is the creator');
    }

    const isParticipating = sharedlist.participants.filter(
      participant => participant.id === user.id,
    );
    if (isParticipating.length === 0) {
      throw new ConflictException(
        'Cannot leave a shared list that user isnt participating',
      );
    }

    const userIndex = sharedlist.participants.indexOf(user);
    sharedlist.participants.splice(userIndex);
    await this.sharedlistRepository.save(sharedlist);
  }
}

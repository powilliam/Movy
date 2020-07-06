import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser({ username, password }: CreateUserDTO): Promise<User> {
    const isRegistered = await this.userRepository.findOne({
      where: { username },
    });
    if (isRegistered) {
      throw new ConflictException('User already exists');
    }

    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    const hashedPassword = CryptoJS.PBKDF2(password, salt).toString();

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });
    await this.userRepository.save(user);

    return user;
  }
}

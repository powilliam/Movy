import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { JwtResponse } from './interfaces/jwt-response';
import { JwtPayload } from './interfaces/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username },
      select: ['id', 'username', 'password'],
    });
    if (!user) {
      return null;
    }

    const isValid = await verify(user.password, password);
    if (!isValid) {
      return null;
    }

    return user;
  }

  async login(user: User): Promise<JwtResponse> {
    const payload: JwtPayload = { userId: user.id, username: user.username };
    return { access_token: this.jwtService.sign(payload) };
  }
}

import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';

export interface CreatedResponse {
  statusCode: number;
  user: {
    id: string;
    username: string;
  };
}

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDTO: CreateUserDTO): Promise<CreatedResponse> {
    const isRegistered = await this.usersService.findOne(
      createUserDTO.username,
    );
    if (isRegistered) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const user = await this.usersService.createUser(createUserDTO);
    return { statusCode: HttpStatus.CREATED, user };
  }
}

import { Controller, Post, Body, Delete } from '@nestjs/common';
import { UsersSharedlistsService } from './users-sharedlists.service';
import { JoinSharedlistDTO } from './dto/join-sharedlist.dto';
import { LeaveSharedlistDTO } from './dto/leave-sharedlist.dto';
import { Sharedlist } from 'src/sharedlists/sharedlist.entity';

@Controller('users-sharedlists')
export class UsersSharedlistsController {
  constructor(
    private readonly usersSharedlistsService: UsersSharedlistsService,
  ) {}

  @Post()
  async create(
    @Body() joinSharedlistDTO: JoinSharedlistDTO,
  ): Promise<Sharedlist> {
    return await this.usersSharedlistsService.joinSharedlist(joinSharedlistDTO);
  }

  @Delete()
  async destroy(@Body() leaveSharedlistDTO: LeaveSharedlistDTO): Promise<void> {
    return await this.usersSharedlistsService.leaveSharedlist(
      leaveSharedlistDTO,
    );
  }
}

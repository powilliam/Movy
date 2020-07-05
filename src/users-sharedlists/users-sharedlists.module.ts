import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersSharedlistsController } from './users-sharedlists.controller';
import { UsersSharedlistsService } from './users-sharedlists.service';
import { User } from '../users/user.entity';
import { Sharedlist } from '../sharedlists/sharedlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Sharedlist])],
  controllers: [UsersSharedlistsController],
  providers: [UsersSharedlistsService],
})
export class UsersSharedlistsModule {}

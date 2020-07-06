import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedlistsController } from './sharedlists.controller';
import { SharedlistsService } from './sharedlists.service';
import { Sharedlist } from './sharedlist.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sharedlist, User])],
  controllers: [SharedlistsController],
  providers: [SharedlistsService],
})
export class SharedlistsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';
import { SharedlistsService } from '../sharedlists/sharedlists.service';
import { Sharedlist } from '../sharedlists/sharedlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Sharedlist])],
  controllers: [MoviesController],
  providers: [MoviesService, SharedlistsService],
})
export class MoviesModule {}

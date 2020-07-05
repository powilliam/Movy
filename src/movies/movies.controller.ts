import {
  Controller,
  Post,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  Body,
  Param,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { Movie } from './movie.entity';
import { SharedlistsService } from 'src/sharedlists/sharedlists.service';

export interface CreateResponse {
  statusCode: number;
  movie: Movie;
}

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly sharedlistsService: SharedlistsService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createMovieDTO: CreateMovieDTO,
  ): Promise<CreateResponse> {
    const {
      title,
      overview,
      identifier,
      backdrop,
      voteAverage,
      releaseDate,
      sharedlistId,
    } = createMovieDTO;

    const sharedlist = await this.sharedlistsService.searchSharedlist(
      sharedlistId,
    );
    if (!sharedlist) {
      throw new HttpException(
        'Cannot create a movie related to an invalid shared list',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const movie = await this.moviesService.createMovie({
      title,
      overview,
      identifier,
      backdrop,
      voteAverage,
      releaseDate,
      sharedlist,
    });

    return { statusCode: HttpStatus.CREATED, movie };
  }

  @Delete(':movieId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('movieId') movieId: string): Promise<void> {
    await this.moviesService.deleteMovie(movieId);
  }
}

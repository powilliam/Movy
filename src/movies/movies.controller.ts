import {
  Controller,
  Post,
  Delete,
  HttpCode,
  HttpStatus,
  Body,
  Param,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { Movie } from './movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  async create(@Body() createMovieDTO: CreateMovieDTO): Promise<Movie> {
    return await this.moviesService.createMovie(createMovieDTO);
  }

  @Delete(':movieId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('movieId') movieId: string): Promise<void> {
    await this.moviesService.deleteMovie(movieId);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { Sharedlist } from '../sharedlists/sharedlist.entity';
import { CreateMovieDTO } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Sharedlist)
    private readonly sharedlistRepository: Repository<Sharedlist>,
  ) {}

  async createMovie(createMovieDTO: CreateMovieDTO): Promise<Movie> {
    const {
      title,
      overview,
      identifier,
      backdrop,
      voteAverage,
      releaseDate,
      sharedlistId,
    } = createMovieDTO;

    const sharedlist = await this.sharedlistRepository.findOne({
      where: { id: sharedlistId },
    });
    if (!sharedlist) {
      throw new NotFoundException(
        'Cannot create a movie related to an invalid shared list',
      );
    }

    const movie = this.movieRepository.create({
      title,
      overview,
      identifier,
      backdrop,
      voteAverage,
      releaseDate,
      sharedlist,
    });
    await this.movieRepository.save(movie);

    return movie;
  }

  async deleteMovie(movieId: string): Promise<void> {
    await this.movieRepository.delete({ id: movieId });
  }
}

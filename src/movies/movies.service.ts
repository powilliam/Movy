import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { Sharedlist } from '../sharedlists/sharedlist.entity';

interface CreateMovie {
  title: string;
  overview: string;
  voteAverage: number;
  backdrop: string;
  releaseDate: string;
  identifier: number;
  sharedlist: Sharedlist;
}

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async createMovie(body: CreateMovie): Promise<Movie> {
    const movie = this.movieRepository.create(body);
    await this.movieRepository.save(movie);

    return movie;
  }

  async deleteMovie(movieId: string): Promise<void> {
    await this.movieRepository.delete({ id: movieId });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAllMovies(): Movie[] {
    return this.movies;
  }

  createMovie(movieData: CreateMovieDTO) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  getMovie(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID: ${id} not found.`);
    }
    return movie;
  }

  updateMovie(id: number, updateData: UpdateMovieDTO) {
    const movie = this.getMovie(id);
    this.deleteMovie(id);
    this.movies.push({ ...movie, ...updateData });
  }

  deleteMovie(id: number) {
    this.getMovie(id);
    this.movies = this.movies.filter((movie) => movie.id !== +id);
  }
}

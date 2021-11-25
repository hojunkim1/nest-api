import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAllMovies(): Movie[] {
    return this.moviesService.getAllMovies();
  }

  @Post()
  createMovie(@Body() movieData) {
    return this.moviesService.createMovie(movieData);
  }

  @Get(':id')
  getMovie(@Param('id') movieId: string): Movie {
    return this.moviesService.getMovie(movieId);
  }

  @Patch(':id')
  updateMovie(@Param('id') movieId: string, @Body() updateData) {
    return this.moviesService.updateMovie(movieId, updateData);
  }

  @Delete(':id')
  deleteMovie(@Param('id') movieId: string) {
    return this.moviesService.deleteMovie(movieId);
  }
}

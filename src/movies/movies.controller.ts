import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
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
  createMovie(@Body() movieData: CreateMovieDTO) {
    return this.moviesService.createMovie(movieData);
  }

  @Get(':id')
  getMovie(@Param('id') movieId: number): Movie {
    return this.moviesService.getMovie(movieId);
  }

  @Patch(':id')
  updateMovie(
    @Param('id') movieId: number,
    @Body() updateData: UpdateMovieDTO,
  ) {
    return this.moviesService.updateMovie(movieId, updateData);
  }

  @Delete(':id')
  deleteMovie(@Param('id') movieId: number) {
    return this.moviesService.deleteMovie(movieId);
  }
}

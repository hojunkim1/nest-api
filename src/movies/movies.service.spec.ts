import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllMovies', () => {
    it('should return a array', () => {
      const result = service.getAllMovies();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('createMovies', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAllMovies().length;
      service.createMovie({
        title: 'Test Movie',
        genres: ['Action', 'Drama'],
        year: 2020,
      });
      const afterCreate = service.getAllMovies().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('getMovie', () => {
    it('should return a movie', () => {
      service.createMovie({
        title: 'Test Movie',
        genres: ['Action', 'Drama'],
        year: 2020,
      });
      const movie = service.getMovie(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try {
        service.getMovie(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Movie with ID: 999 not found.');
      }
    });
  });

  describe('updateMovie', () => {
    it('should update a movie', () => {
      service.createMovie({
        title: 'Test Movie',
        genres: ['Action', 'Drama'],
        year: 2020,
      });
      service.updateMovie(1, { title: 'Updated Movie' });
      const movie = service.getMovie(1);
      expect(movie.title).toEqual('Updated Movie');
    });

    it('should throw NotFoundException', () => {
      try {
        service.updateMovie(999, {});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteMovie', () => {
    it('delete a movie', () => {
      service.createMovie({
        title: 'Test Movie',
        genres: ['Action', 'Drama'],
        year: 2020,
      });
      const beforeDelete = service.getAllMovies();
      service.deleteMovie(1);
      const afterDelete = service.getAllMovies();
      expect(afterDelete.length).toBeLessThan(beforeDelete.length);
    });

    it('should throw NotFoundException', () => {
      try {
        service.deleteMovie(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: '영화제목',
        year: 2024,
        genres: ['comedy'],
      });
      const result = service.getOne(1);
      expect(result).toBeDefined(); // !== undefined
      expect(result.id).toEqual(1);
    });
    it('should throw NotFoundException', () => {
      try {
        service.getOne(1);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toEqual(`Movie with ID 1 not found.`);
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        title: '영화제목',
        year: 2024,
        genres: ['comedy'],
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll.length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it('should return a NotFoundException', () => {
      try {
        service.deleteOne(1);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a Movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: '영화제목',
        year: 2024,
        genres: ['comedy'],
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: '영화제목',
        year: 2024,
        genres: ['comedy'],
      });
      service.update(1, { title: 'Updated Test' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');
      expect(movie.year).toEqual(2024);
    });
  });
  it('should throw a NotFoundException', () => {
    try {
      service.update(999, {});
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
    }
  });
});

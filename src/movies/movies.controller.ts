import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') movieId: string): Movie {
    const movie = this.moviesService.getOne(movieId);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found.`);
    }
    return movie;
  }

  @Post()
  createMovie(@Body() movieData) {
    return this.moviesService.create(movieData);
  }

  @Delete(':id')
  deleteMovie(@Param('id') movieId: string) {
    return this.moviesService.deleteOne(movieId);
  }

  @Patch(':id')
  updateMovie(@Param('id') movieId: string, @Body() updateData) {
    return this.moviesService.update(movieId, updateData);
  }
}

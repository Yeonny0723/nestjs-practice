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
import { UpdateMovieDTO } from 'src/dto/update-movie.dto';
import { CreateMovieDTO } from 'src/dto/create-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') movieId: number): Movie {
    const movie = this.moviesService.getOne(movieId);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found.`);
    }
    return movie;
  }

  @Post()
  createMovie(@Body() movieData: CreateMovieDTO) {
    return this.moviesService.create(movieData);
  }

  @Delete(':id')
  deleteMovie(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  @Patch(':id')
  updateMovie(
    @Param('id') movieId: number,
    @Body() updateData: UpdateMovieDTO,
  ) {
    return this.moviesService.update(movieId, updateData);
  }
}

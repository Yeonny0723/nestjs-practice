import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDTO {
  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsNumber()
  readonly year: number;

  @ApiProperty()
  @ApiProperty({
    description: '장르입니다.',
    example: '[스릴러, 코미디]',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly genres: string[];
}

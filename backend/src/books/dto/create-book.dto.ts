import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  TITLE_MIN_LENGTH,
  TITLE_MAX_LENGTH,
  AUTHOR_MIN_LENGTH,
  AUTHOR_MAX_LENGTH,
} from 'src/utils/constants';

TITLE_MAX_LENGTH;

export class CreateBookDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(TITLE_MIN_LENGTH)
  @MaxLength(TITLE_MAX_LENGTH)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(AUTHOR_MIN_LENGTH)
  @MaxLength(AUTHOR_MAX_LENGTH)
  author: string;
}

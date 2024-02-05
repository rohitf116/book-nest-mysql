import {
  IsString,
  IsNotEmpty,
  Matches,
  IsEmail,
  MinLength,
  MaxLength,
  ArrayNotEmpty,
  IsDateString,
  IsArray,
  IsOptional,
} from 'class-validator';
import { Any } from 'typeorm';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  excerpt: string;

  @IsString()
  @IsNotEmpty()
  // @Matches(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/, {
  //   message: 'Invalid ISBN format',
  // })
  ISBN: string;

  @IsString()
  @IsOptional()
  image: string;
  // @ApiProperty({ type: 'string', format: 'binary' }) // This is important for Swagger documentation

  @IsString()
  @IsNotEmpty()
  category: string;

  // @IsArray()
  @IsString()
  subcategories: string; // Assuming subcategories are represented by their IDs

  @IsDateString()
  releasedAt: string;
}

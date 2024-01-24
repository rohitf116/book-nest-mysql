import {
  IsString,
  IsNotEmpty,
  Matches,
  IsEmail,
  MinLength,
  MaxLength,
  ArrayNotEmpty,
  IsDateString,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  excerpt: string;

  @IsString()
  @IsNotEmpty()
  ISBN: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @ArrayNotEmpty()
  subcategories: number[]; // Assuming subcategories are represented by their IDs

  @IsDateString()
  releasedAt: string;
}

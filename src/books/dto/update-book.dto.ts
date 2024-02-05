import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import {
  IsString,
  IsNotEmpty,
  ArrayNotEmpty,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  excerpt: string;

  @IsString()
  @IsNotEmpty()
  ISBN: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  category: string;

  @IsString()
  subcategories: string; // Assuming subcategories are represented by their IDs

  @IsDateString()
  @IsOptional()
  releasedAt: string;
}

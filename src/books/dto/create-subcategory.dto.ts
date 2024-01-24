import {
  IsString,
  IsNotEmpty,
  Matches,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateSubcategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

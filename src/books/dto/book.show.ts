import { Expose, Transform, Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

class SubCategoryDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

export class BookShowDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  excerpt: string;

  @Expose()
  ISBN: string;

  @Expose()
  category: number;

  @Expose()
  createdAt: Date;

  @Expose()
  @IsArray()
  @ValidateNested()
  @Type(() => SubCategoryDto)
  subcategories: SubCategoryDto[];
}

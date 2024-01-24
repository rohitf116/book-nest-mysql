import { Expose, Transform, Type } from 'class-transformer';

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
}

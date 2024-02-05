import { Expose } from 'class-transformer';
export class UserShowDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  phone: string;

  @Expose()
  email: string;

  @Expose()
  createdAt: Date;

  @Expose()
  token: string;
}

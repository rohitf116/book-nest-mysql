import { Address } from '../entities/address.entity';
import { Title } from '../enums/title.enum';

export interface UserInterface {
  id: number;
  title: Title;
  name: string;
  phone: string;
  email: string;
  password: string;
  isDeleted: boolean;
  address: Address;
  createdAt: Date;
  updatedAt: Date;
}

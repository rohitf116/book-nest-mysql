import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Address } from './address.entity';
import { Title } from '../enums/title.enum';
import { Book } from 'src/books/entities/book.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Title,
    nullable: false,
  })
  title: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    unique: true,
    nullable: false,
  })
  phone: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
    length: 100,
  })
  password: string;

  @Column({ default: false })
  isDeleted: boolean;

  @OneToOne(() => Address, (address) => address.user) // Define the relationship
  @JoinColumn()
  address: Address;

  @OneToMany(() => Book, (book) => book.user)
  books: Book[];

  // books: any[] = [];

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  updatedAt: Date;
}

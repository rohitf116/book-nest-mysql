import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Book } from './book.entity';

@Entity() // Add this decorator to indicate that Book is an entity
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @ManyToMany(() => Book, (book) => book.subcategories)
  @JoinTable({
    name: 'book_sub_categories',
    joinColumn: { name: 'subcategoryId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'bookId', referencedColumnName: 'id' },
  })
  book: Book[];

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

import { Book } from 'src/books/entities/book.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reviewedBy: string;

  @Column()
  reviewedAt: Date;

  @Column()
  rating: number;

  @Column()
  review: string;

  @ManyToOne(() => Book)
  @JoinColumn()
  book: Book;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({
    type: 'timestamp',
    default: null,
  })
  deletedAt: Date;

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

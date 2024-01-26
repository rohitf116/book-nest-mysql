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
import { SubCategory } from './subcategories.entity';
import { Review } from 'src/reviews/entities/review.entity';

@Entity() // Add this decorator to indicate that Book is an entity
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  title: string;

  @Column({
    nullable: false,
  })
  excerpt: string;

  @Column({
    unique: true,
    nullable: false,
  })
  ISBN: string;

  @Column({
    nullable: false,
  })
  category: string;

  @ManyToMany(() => SubCategory, (subcategories) => subcategories.book, {
    cascade: true,
  })
  @JoinTable({
    name: 'book_sub_categories',
    joinColumn: { name: 'bookId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'subcategoryId', referencedColumnName: 'id' },
  })
  subcategories: SubCategory[];

  @Column({ default: false })
  isDeleted: boolean;

  @Column({
    type: 'timestamp',
    default: null,
  })
  deletedAt: Date;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  releasedAt: Date;

  @ManyToOne(() => User, (user) => user.books, { cascade: true })
  @JoinColumn()
  user: User;
  @OneToMany(() => Review, (review) => review.book)
  @JoinColumn()
  review: Review[];

  @Column({ default: 0 })
  reviews: number;

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

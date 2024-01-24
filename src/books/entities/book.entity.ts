import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { SubCategory } from './subcategories.entity';

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

  @ManyToMany(() => SubCategory, (subcategory) => subcategory.books)
  subcategory: SubCategory[];

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

  @ManyToOne(() => User, (user) => user.books)
  user: User;

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

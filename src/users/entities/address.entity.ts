import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity'; // Import the User entity

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  pincode: string;

  @OneToOne(() => User, (user) => user.address) // Establish the relationship back to User
  user: User; // Reference to the user owning this address
}

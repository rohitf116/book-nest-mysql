import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { User } from 'src/users/entities/user.entity';
import { Address } from 'src/users/entities/address.entity';
import { AuthGuard } from 'src/guard/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SubCategory } from './entities/subcategories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, User, Address, SubCategory])],
  controllers: [BooksController],
  providers: [BooksService, BooksService, UsersService],
  exports: [BooksService],
})
export class BooksModule {}

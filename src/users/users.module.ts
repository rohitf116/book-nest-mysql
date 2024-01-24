import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Address } from './entities/address.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/guard/auth.guard';
import { Book } from 'src/books/entities/book.entity';
import { BooksService } from 'src/books/books.service';
import { SubCategory } from 'src/books/entities/subcategories.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Address, Book, SubCategory]),
    JwtModule.register({
      global: true,
      secret: 'Hiii',
      signOptions: { expiresIn: '60000s' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthGuard, BooksService],
  exports: [UsersService],
})
export class UsersModule {}

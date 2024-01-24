import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { createConnection } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Address } from './users/entities/address.entity';
import { BooksModule } from './books/books.module';
import { Book } from './books/entities/book.entity';
import { SubCategory } from './books/entities/subcategories.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database-2.cdsmzxpybq51.ap-south-1.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: 'rohit123',
      database: 'bookManagement',
      entities: [User, Address, Book, SubCategory],
      synchronize: true,
    }),
    UsersModule,
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

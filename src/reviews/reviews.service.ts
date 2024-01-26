import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/books/entities/book.entity';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}
  async create(id: number, createReviewDto: CreateReviewDto) {
    const foundBook = await this.bookRepository.findOne({ where: { id } });
    if (!foundBook) throw new NotFoundException('Book not found');
    const reviewedAt = new Date();
    const review = this.reviewRepository.create({
      ...createReviewDto,
      reviewedAt,
      book: foundBook,
    });

    const updated = await this.reviewRepository.save(review);
    return updated;
  }

  async findAll(id: number) {
    const reviews = await this.reviewRepository.find({
      where: {
        isDeleted: false,
        // Add your search criteria here
        // Example: searching by bookId
        book: { id: id },
        // You can add more conditions as needed
      },
    });
    return reviews;
  }

  async findOne(id: number, reviewId: number) {
    const reviews = await this.reviewRepository.findOne({
      where: {
        isDeleted: false,
        id: reviewId,
        // Add your search criteria here
        // Example: searching by bookId
        book: { id: id },
        // You can add more conditions as needed
      },
    });
    return reviews;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  async remove(id: number, reviewId: number) {
    const current = await this.findOne(id, reviewId);
    if (!current) throw new NotFoundException('Book not found');
    current.deletedAt = new Date();
    current.isDeleted = true;

    await this.reviewRepository.save(current);
    return 'deleted succesfully';
  }
}

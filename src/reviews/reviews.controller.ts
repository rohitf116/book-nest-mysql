import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('books/:id/review')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post('')
  create(@Param('id') id: string, @Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(+id, createReviewDto);
  }

  @Get()
  findAll(@Param('id') id: string) {
    return this.reviewsService.findAll(+id);
  }

  @Get(':reviewId')
  findOne(@Param('id') id: string, @Param('reviewId') reviewId: string) {
    return this.reviewsService.findOne(+id, +reviewId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':reviewId')
  remove(@Param('id') id: string, @Param('reviewId') reviewId: string) {
    return this.reviewsService.remove(+id, +reviewId);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { ModifiedRequest } from 'src/users/m';
import { Serialize } from 'src/interceptor/serialize.interceptor';
import { BookShowDto } from './dto/book.show';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createBookDto: CreateBookDto, @Req() req: ModifiedRequest) {
    return this.booksService.create(createBookDto, req);
  }
  @UseGuards(AuthGuard)
  @Post('/subcategory')
  createSubcategory(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    return this.booksService.createSubcategory(createSubcategoryDto);
  }

  @Get('/subcategory')
  grtAllSubcategory() {
    return this.booksService.findAllSubcategory();
  }

  //book
  @Serialize(BookShowDto)
  @Get()
  async findAll() {
    const all = await this.booksService.findAll();
    return { message: 'fetched all', count: '12', data: all };
  }

  @Get('/my')
  findAllMy(@Req() req: ModifiedRequest) {
    return this.booksService.findAllMy(req);
  }

  @Serialize(BookShowDto)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.booksService.findOne(+id);
    return { message: 'fetched aby id', count: '12', data: result };
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() req: ModifiedRequest,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.update(+id, req, updateBookDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: ModifiedRequest) {
    return this.booksService.remove(+id, req);
  }
}

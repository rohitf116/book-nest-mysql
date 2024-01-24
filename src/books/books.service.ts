import { ConflictException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategory } from './entities/subcategories.entity';
import { Repository } from 'typeorm';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { ModifiedRequest } from 'src/users/m';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(SubCategory)
    private readonly subcategoryRepository: Repository<SubCategory>,
  ) {}
  async createSubcategory(createSubcategotyDto: CreateSubcategoryDto) {
    const isAlreadyExist = await this.findOneByNameSubcategory(
      createSubcategotyDto.name,
    );
    if (isAlreadyExist) {
      throw new ConflictException('THis subcategory already exist');
    }
    const sub = this.subcategoryRepository.create(createSubcategotyDto);
    return this.subcategoryRepository.save(sub);
  }
  async findOneByNameSubcategory(nameString: string) {
    const subCategory = await this.subcategoryRepository.findOne({
      where: { name: nameString },
    });
    return subCategory;
  }
  async findAllSubcategory() {
    const subCategory = await this.subcategoryRepository.find({});
    return subCategory;
  }

  async create(createBookDto: CreateBookDto, req: ModifiedRequest) {
    const isIsbnUsed = await this.findOneByIsbn(createBookDto.ISBN);
    if (isIsbnUsed) {
      throw new ConflictException('This isbn already exist');
    }
    const userId = req.user;
    const book = this.bookRepository.create({ ...createBookDto, user: userId });
    return this.bookRepository.save(book);
  }

  async findOneByIsbn(isbn: string) {
    const book = await this.bookRepository.findOne({
      where: { ISBN: isbn },
    });
    return book;
  }

  findAll() {
    return this.bookRepository.find({});
  }
  async findAllMy(req: ModifiedRequest) {
    const userId = req.user;
    return this.bookRepository.find({
      where: { user: userId },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}

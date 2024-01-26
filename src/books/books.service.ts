import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategory } from './entities/subcategories.entity';
import { In, Repository } from 'typeorm';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { ModifiedRequest } from 'src/users/m';
import { NotFoundError } from 'rxjs';

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
  async finOneById(subIds: number[]) {
    const x = await this.subcategoryRepository.find({
      where: {
        id: In(subIds),
      },
    });

    return x;
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
    console.log({ createBookDto });
    const found = await this.finOneById(createBookDto.subcategories);

    // const tags = found.map((createTagDto) => new SubCategory(createTagDto));
    // return found;

    const book = this.bookRepository.create({
      ...createBookDto,
      subcategories: found,
      user: userId,
    });
    console.log(book);
    return this.bookRepository.save(book);
  }
  async findOneByIsbn(isbn: string) {
    const book = await this.bookRepository.findOne({
      where: { ISBN: isbn, isDeleted: false },
    });
    return book;
  }

  findAll() {
    return this.bookRepository.find({
      where: { isDeleted: false },
      relations: ['subcategories'],
    });
  }
  async findAllMy(req: ModifiedRequest) {
    const userId = req.user;
    return this.bookRepository.find({
      where: { user: userId, isDeleted: false },
    });
  }

  findOne(id: number) {
    return this.bookRepository.findOne({
      where: { id, isDeleted: false },
      relations: ['subcategories'],
    });
  }

  async update(id: number, req: ModifiedRequest, updateBookDto: UpdateBookDto) {
    const user = req.user;
    const result = await this.bookRepository.findOne({
      where: { id, user, isDeleted: false },
      relations: ['subcategories'],
    });
    if (!result) throw new NotFoundException('Book not found');
    const found = await this.finOneById(updateBookDto.subcategories);

    Object.assign(result, { ...updateBookDto, subcategories: found });
    const updated = await this.bookRepository.save(result);
    return updated;
  }

  async remove(id: number, req: ModifiedRequest) {
    const user = req.user;
    const result = await this.bookRepository.findOne({
      where: { id, user, isDeleted: false },
    });
    if (!result) throw new NotFoundException('Book not found');
    result.isDeleted = true;
    result.deletedAt = new Date();
    await this.bookRepository.save(result);
    return result;
  }
}

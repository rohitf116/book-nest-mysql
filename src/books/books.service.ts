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
import { uploadFile } from 'src/utils/awsS3.util';

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
    let file = null;
    let uploadedFile = '';
    if (req.files.length) {
      file = req.files[0];
      uploadedFile = await uploadFile(file);
    }

    const userId = req.user;
    console.log({ createBookDto });
    let subCat: number[];
    if (createBookDto?.subcategories?.includes(',')) {
      const subcategories = createBookDto.subcategories.split(',');
      subCat = subcategories.map((i) => Number(i));
    } else {
      subCat = [
        Number(createBookDto.subcategories) >= 0
          ? Number(createBookDto.subcategories)
          : 0,
      ];
    }

    // console.log(subcategories);
    // const found = await this.finOneById(createBookDto.subcategories);
    const found = await this.finOneById(subCat);

    // const tags = found.map((createTagDto) => new SubCategory(createTagDto));
    // return found;
    const newObj = {
      ...createBookDto,
      image: uploadedFile,
      subcategories: found,
      user: userId,
    };

    const book = this.bookRepository.create(newObj);
    // console.log(book);
    return this.bookRepository.save(book);
  }
  async findOneByIsbn(isbn: string) {
    const book = await this.bookRepository.findOne({
      where: { ISBN: isbn, isDeleted: false },
    });
    return book;
  }

  async findAll() {
    const b = await this.bookRepository.find({
      where: { isDeleted: false },
      relations: ['subcategories'],
    });
    return b;
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
    const subcategories = updateBookDto.subcategories.split(',');
    const numArray = subcategories.map((i) => Number(i));
    const found = await this.finOneById(numArray);
    if (result.ISBN !== updateBookDto.ISBN) {
      const isIsbnUsed = await this.findOneByIsbn(updateBookDto.ISBN);
      if (isIsbnUsed) {
        throw new ConflictException('This isbn already exist');
      }
    }
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

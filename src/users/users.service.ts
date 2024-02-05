import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { UserInterface } from './interface/user.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateAddressDto } from './dto/create-address.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.hashPassword(createUserDto.password);
    const newUser = { ...createUserDto, password: hashedPassword };
    const user = this.userRepository.create(newUser);
    const isNumUsed = await this.isPhoneExist(createUserDto.phone);
    const isEmailUsed = await this.isEmailUse(createUserDto.email, false);
    if (isNumUsed) {
      throw new ConflictException('Phone number is already in use');
    }
    if (isEmailUsed) {
      throw new ConflictException('Email number is already in use');
    }
    return this.userRepository.save(user);
  }

  async login(loginUserDto: LoginUserDto) {
    const isEmailUsed = await this.isEmailUse(loginUserDto.email, true);
    if (!isEmailUsed) {
      throw new UnauthorizedException('creditails mismatch1');
    }
    const isMath = await this.comparePassword(
      isEmailUsed.password,
      loginUserDto.password,
    );
    console.log({ isMath, loginUserDto, isEmailUsed });
    if (!isMath) {
      throw new UnauthorizedException('creditails mismatch');
    }
    const payload = { userId: isEmailUsed.id };
    return {
      ...isEmailUsed,
      token: await this.jwtService.signAsync(payload),
    };
  }

  async hashPassword(password: string) {
    const saltOrRounds = 12;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  async comparePassword(ogPass: string, newPass: string) {
    console.log({ newPass, ogPass });
    const isMatch = await bcrypt.compare(newPass, ogPass);
    return isMatch;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id, isDeleted: false },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
  async isPhoneExist(phone: string) {
    const userWithPhone = await this.userRepository.findOne({
      where: { phone },
    });
    return !!userWithPhone;
  }

  async isEmailUse(email: string, onlyDeleted: boolean) {
    const query = onlyDeleted ? { email, isDeleted: false } : { email };
    const user = await this.userRepository.findOne({
      where: query,
    });
    return user;
  }

  async addAddress(id: number, address: CreateAddressDto) {
    const savedaddress = this.addressRepository.create(address);

    const addressId = await this.addressRepository.save(savedaddress);
    const foundUser = await this.findOne(id);
    foundUser.address = addressId;
    await this.userRepository.save(foundUser);
    return foundUser;
  }
  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      // User not found
      return false;
    }

    user.isDeleted = true; // Assuming you have an isDeleted field in your User entity
    await this.userRepository.save(user);

    return true; // User was found and soft-deleted
  }
}

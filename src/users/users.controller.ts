import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { CreateAddressDto } from './dto/create-address.dto';
import { ModifiedRequest } from './m';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @UseGuards(AuthGuard)
  @Post('/address')
  addAddress(@Body() address: CreateAddressDto) {
    return this.usersService.addAddress(12, address);
  }

  @UseGuards(AuthGuard)
  @Get('current')
  findOne(@Req() req: ModifiedRequest) {
    console.log({ user: req!.user });
    return req!.user;
    // return this.usersService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch('')
  update(@Req() req: ModifiedRequest, @Body() updateUserDto: UpdateUserDto) {
    const { id } = req.user;
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete('')
  remove(@Req() req: ModifiedRequest) {
    const { id } = req.user;
    return this.usersService.remove(+id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const userCreated = this.userRepository.create(createUserDto);
    const user = this.userRepository.save(userCreated);
    return user;
  }

  findAll() {
    const users = this.userRepository.find();
    return users;
  }

  findOne(id: number) {
    const user = this.userRepository.findOneBy({ id: id });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const deleteUser = await this.findOne(id);
    return this.userRepository.remove(deleteUser);
  }
}

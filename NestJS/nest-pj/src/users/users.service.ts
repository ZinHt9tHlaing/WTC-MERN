import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntities } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntities)
    private readonly userRepository: Repository<UserEntities>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntities> {
    const existingUser = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new BadRequestException(
        `User with email "${createUserDto.email}" already exists`,
      );
    }
    const newUser = this.userRepository.create(createUserDto);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    return this.userRepository.save(newUser);
  }

  async findOne(id: number): Promise<UserEntities> {
    const user = await this.userRepository.findOneBy({ user_id: id });
    if (!user) {
      throw new BadRequestException(`User with ID ${id} not found`);
    }
    return user;
  }

  async login(email: string, password: string): Promise<UserEntities> {
    try {
      const user = await this.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException('Invalid email');
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new UnauthorizedException('Invalid password');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('An error occurred during login');
    }
  }

  async findAll(): Promise<UserEntities[]> {
    return this.userRepository.find();
  }

  findByUsername(username: string): Promise<UserEntities> {
    return this.userRepository.findOne({ where: { username } });
  }

  findByEmail(email: string): Promise<UserEntities> {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntities> {
    const user = await this.findOne(id);
    this.userRepository.merge(user, updateUserDto); // TODO: mergeက မရှိရင်အသစ်ထည့်ရှိရင် overwriteလုပ်
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.userRepository.delete(id);
    return { message: 'Delete successfully' };
  }
}

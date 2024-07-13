import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { hash } from 'src/common/hash';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findBy(query: { [key in keyof User]?: any }): Promise<User> {
    return this.userRepository.findOne(query);
  }

  async findById(id: string): Promise<User> {
    return this.findBy({ id });
  }

  async findByUsername(username: string): Promise<User> {
    return this.findBy({ username });
  }

  async create({
    username,
    password,
    email,
  }: {
    username: string;
    email: string;
    password: string;
  }) {
    const hashedPassword = await hash(password);

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = hashedPassword;

    await this.userRepository.insert(user);
    return user;
  }
}

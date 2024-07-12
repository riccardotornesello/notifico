import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/sqlite';
import { LoadStrategy } from '@mikro-orm/core';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { SignUpDto } from './dto/signup';
import { Token } from './entities/token.entity';
import { hash, compareHash } from '../common/hash';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: EntityRepository<Token>,
    private usersService: UsersService,
  ) {}

  async signIn(username: string, pass: string): Promise<User> {
    const user = await this.usersService.findByUsername(username);
    const isPasswordValid = await compareHash(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async register(signUpDto: SignUpDto): Promise<User> {
    return this.usersService.create({
      username: signUpDto.username,
      email: signUpDto.email,
      password: signUpDto.password,
    });
  }

  async generateToken(userId: string): Promise<[string, string]> {
    // TODO: better random generation
    // TODO: check if token is saved in the database

    const id = Math.random().toString(36).substring(7);
    const secret = Math.random().toString(36).substring(7);

    await this.tokenRepository.insert({
      id,
      secret: await hash(secret),
      user: userId,
    });

    return [id, secret];
  }

  async getUserFromToken(token: string): Promise<User | null> {
    const [id, secret] = token.split(':');
    const tokenEntity = await this.tokenRepository.findOne(
      { id },
      { populate: ['user'], strategy: LoadStrategy.JOINED },
    );

    if (!tokenEntity) {
      return null;
    }

    const isSecretValid = await compareHash(secret, tokenEntity.secret);
    if (!isSecretValid) {
      return null;
    }

    return tokenEntity.user;
  }
}

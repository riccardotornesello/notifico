import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { LoadStrategy, EntityRepository } from '@mikro-orm/core';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { SignUpDto } from './dto/signup';
import { Token } from './entities/token.entity';
import { hash, compareHash } from '../common/hash';
import { generateRandomString } from 'src/common/random';

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

  /**
   * Generate a token for a user
   *
   * @param userId ID of the user to generate a token for
   * @param duration Duration in seconds for which the token should be valid
   * @returns A tuple containing the token ID and the secret
   */
  async generateToken(
    userId: string,
    duration: number = 60 * 60 * 24 * 7,
  ): Promise<[string, string]> {
    const id = generateRandomString(8);
    const secret = generateRandomString(30);
    const hashedSecret = await hash(secret);
    const expiresAt = new Date(Date.now() + duration * 1000);

    await this.tokenRepository.insert({
      id,
      secret: hashedSecret,
      user: userId,
      expiresAt,
    });

    return [id, secret];
  }

  async getUserFromToken(token: string): Promise<User | null> {
    const [id, secret] = token.split(':');
    const tokenEntity = await this.tokenRepository.findOne(
      { id },
      { populate: ['user'], strategy: LoadStrategy.JOINED },
    );

    // Check if a token with the given ID exists
    if (!tokenEntity) {
      return null;
    }

    // Check if the token has expired
    if (tokenEntity.expiresAt < new Date()) {
      return null;
    }

    // Check if the secret is valid
    const isSecretValid = await compareHash(secret, tokenEntity.secret);
    if (!isSecretValid) {
      return null;
    }

    return tokenEntity.user;
  }
}

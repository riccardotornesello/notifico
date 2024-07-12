import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Request,
} from '@nestjs/common';
import { Auth } from './decorators/auth';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup';
import { SignInDto } from './dto/signin';

// TODO: DTO

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    const user = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    const [id, secret] = await this.authService.generateToken(user.id);
    return { token: `${id}:${secret}` };
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.register(signUpDto);
  }

  @Auth()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

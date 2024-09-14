import { Controller, Post, Body, Get, Request } from '@nestjs/common';
import { Auth } from './decorators/auth';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup';
import { SignInDto } from './dto/signin';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    const user = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    const [id, secret] = await this.authService.generateToken(user.id);
    return { token: `${id}:${secret}` };
  }

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

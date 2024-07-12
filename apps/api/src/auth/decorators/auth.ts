import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { AuthenticationGuard } from '../guards/authentication.guard';

export function Auth() {
  return applyDecorators(ApiSecurity('bearer'), UseGuards(AuthenticationGuard));
}

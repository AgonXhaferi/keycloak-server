import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserRequest } from './request/register-user.request';
import { KeycloakService } from './keycloak/keycloak.service';
import { AuthenticateUserRequest } from './request/authenticate-user.request';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly keyCloakService: KeycloakService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async createUser(
    @Body() registerUserRequest: RegisterUserRequest,
  ): Promise<string> {
    return this.keyCloakService.createUser(registerUserRequest);
  }

  @Post('login')
  async authenticateUser(
    @Body() registerUserRequest: AuthenticateUserRequest,
  ): Promise<any> {
    return this.authService.loginWithKeycloak(registerUserRequest);
  }
}

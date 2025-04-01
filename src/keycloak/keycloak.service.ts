import { Injectable, OnModuleInit } from '@nestjs/common';
import KcAdminClient from '@keycloak/keycloak-admin-client';
import { RegisterUserRequest } from '../request/register-user.request';
import { v4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KeycloakService implements OnModuleInit {
  keycloakClient: KcAdminClient;
  realm: string; //TODO: Realistically even this is going to be coming from the front-end

  constructor(private readonly configService: ConfigService) {
    this.realm = this.configService.getOrThrow<string>('KEYCLOAK_REALM');
  }

  async onModuleInit() {
    this.keycloakClient = new KcAdminClient({
      realmName: this.realm,
      baseUrl: 'http://localhost:8080',
    });

    await this.keycloakClient.auth({
      username: this.configService.getOrThrow<string>('KEYCLOAK_USERNAME'),
      password: this.configService.getOrThrow<string>('KEYCLOAK_PASSWORD'),
      grantType: 'password', //TODO: What if I want to change this though? There was one for refreshing tokens as well. Maybe is should be passed down by the front-end?
      clientId: this.configService.getOrThrow<string>('KEYCLOAK_CLIENT_ID'),
    });
  }

  async createUser(registerUserRequest: RegisterUserRequest) {
    const userId = v4();

    const createdUser = await this.keycloakClient.users.create({
      realm: this.realm,
      id: userId,
      username: registerUserRequest.username,
      email: registerUserRequest.email,
      enabled: true,
    });

    await this.keycloakClient.users.resetPassword({
      realm: this.realm,
      id: createdUser.id,
      credential: {
        type: 'password',
        value: registerUserRequest.password,
      },
    });

    return userId;
  }
}

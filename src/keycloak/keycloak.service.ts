import { Injectable, OnModuleInit } from '@nestjs/common';
import KcAdminClient from '@keycloak/keycloak-admin-client';
import { RegisterUserRequest } from '../request/register-user.request';
import { v4 } from 'uuid';

@Injectable()
export class KeycloakService implements OnModuleInit {
  keycloakClient: KcAdminClient;

  constructor() {}

  async onModuleInit() {
    this.keycloakClient = new KcAdminClient({
      realmName: 'master',
      baseUrl: 'http://localhost:8080',
    });

    await this.keycloakClient.auth({
      username: 'agon',
      password: 'Ssj2vegito!',
      grantType: 'password',
      clientId: 'admin-cli',
    });
  }

  async createUser(registerUserRequest: RegisterUserRequest) {
    const userId = v4();

    const createdUser = await this.keycloakClient.users.create({
      realm: 'singularis',
      id: userId,
      username: registerUserRequest.username,
      email: registerUserRequest.email,
      enabled: true,
    });

    await this.keycloakClient.users.resetPassword({
      realm: 'singularis',
      id: createdUser.id,
      credential: {
        type: 'password',
        value: registerUserRequest.password,
      },
    });

    return userId;
  }
}

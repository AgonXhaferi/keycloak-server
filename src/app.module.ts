import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { KeycloakService } from './keycloak/keycloak.service';
import {
  KeycloakConnectModule,
  PolicyEnforcementMode,
  TokenValidation,
} from 'nest-keycloak-connect';
import { AuthService } from './auth/auth.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080',
      realm: 'singularis',
      clientId: 'singularis',
      secret: 'bnXLIMOrxlW0xBc4wPX3C993LK5rsyuL',
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE, // optional
      tokenValidation: TokenValidation.ONLINE, // optional
    }),
  ],
  controllers: [AppController],
  providers: [AppService, KeycloakService, AuthService],
})
export class AppModule {}

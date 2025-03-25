import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AuthenticateUserRequest } from '../request/authenticate-user.request';

@Injectable()
export class AuthService {
  constructor(private httpService: HttpService) {}

  async loginWithKeycloak(authenticateUserRequest: AuthenticateUserRequest) {
    const data = new URLSearchParams();
    data.append('grant_type', 'password');
    data.append('client_id', 'singularis');
    data.append('scope', 'email openid');
    data.append('username', authenticateUserRequest.username);
    data.append('password', authenticateUserRequest.password);
    data.append('client_secret', 'bnXLIMOrxlW0xBc4wPX3C993LK5rsyuL');

    const response = await firstValueFrom(
      this.httpService.post(
        'http://localhost:8080/realms/singularis/protocol/openid-connect/token',
        data.toString(),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      ),
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data; // access_token, refresh_token, etc.
  }
}

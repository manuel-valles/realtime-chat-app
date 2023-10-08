import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';

@Injectable()
export class TokenService {
  constructor(private readonly configService: ConfigService) {}

  validateToken(token: string) {
    const refreshToken = this.configService.get<string>('REFRESH_TOKEN_SECRET');
    try {
      return verify(token, refreshToken);
    } catch (error) {
      return null;
    }
  }
}

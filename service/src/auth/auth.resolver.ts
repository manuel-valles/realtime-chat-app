import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse, RegisterResponse } from './auth.type';
import { RegisterDto } from './auth.dto';
import { BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerInput') registerDto: RegisterDto,
    @Context() context: { res: Response },
  ) {
    if (registerDto.confirmPassword !== registerDto.password) {
      throw new BadRequestException('Passwords do not match');
    }

    return this.authService.register(registerDto, context.res);
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('loginInput') loginDto: RegisterDto,
    @Context() context: { res: Response },
  ) {
    return this.authService.login(loginDto, context.res);
  }

  @Mutation(() => Boolean)
  async logout(@Context() context: { res: Response }) {
    return this.authService.logout(context.res);
  }

  @Mutation(() => String)
  async refreshToken(@Context() context: { req: Request; res: Response }) {
    try {
      return this.authService.refreshToken(context.req, context.res);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

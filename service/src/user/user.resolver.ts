import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gaphql-auth.guard';
import { User } from './user.type';
import { UpdateProfileDto } from './user.dto';
import { Request } from 'express';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateProfile(
    @Args('updateProfileInput') updateProfileDto: UpdateProfileDto,
    @Context() context: { req: Request },
  ) {
    const userId = context.req.user.sub;
    return this.userService.updateProfile(userId, updateProfileDto);
  }
}

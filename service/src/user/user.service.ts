import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateProfileDto } from './user.dto';
import { join } from 'path';
import process from 'process';
import { createWriteStream } from 'fs';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async updateProfile(userId: number, { fullName, file }: UpdateProfileDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        fullName,
        avatarUrl: file ? await this.storeImageAndReturnUrl(file) : undefined,
      },
    });
  }

  private async storeImageAndReturnUrl(file: GraphQLUpload) {
    const { createReadStream, filename } = await file;
    const uniqueFilename = `${Date.now()}-${filename}`;
    const imagePath = join(process.cwd(), 'public', uniqueFilename);
    const imageUrl = `${process.env.APP_URL}/${imagePath}`;
    createReadStream().pipe(createWriteStream(imagePath));

    return imageUrl;
  }
}

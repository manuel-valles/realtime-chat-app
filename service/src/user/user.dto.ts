import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsFileUpload } from '../custom-validators/is-file';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

@InputType()
export class UpdateProfileDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @Field(() => GraphQLUpload, { nullable: true })
  @IsFileUpload()
  file: GraphQLUpload.FileUpload;
}

import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

@ValidatorConstraint({ name: 'isFileUpload' })
class IsFileUploadConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    return value instanceof GraphQLUpload;
  }

  defaultMessage() {
    return 'File must be of type FileUpload';
  }
}

export function IsFileUpload(validationOptions?: ValidationOptions) {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      name: 'isFileUpload',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsFileUploadConstraint,
    });
  };
}

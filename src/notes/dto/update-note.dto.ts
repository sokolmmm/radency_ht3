import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

import { EnumCategories } from './../notes.model';

export class UpdateNoteDto {
  @IsOptional()
  @IsString({ message: 'must be a string' })
  @MinLength(5, {
    message: 'length must be at least $constraint1 characters long',
  })
  @MaxLength(50, {
    message:
      'length must be less than or equal to $constraint1 characters long',
  })
  readonly name: string;

  @IsOptional()
  @IsString({ message: 'must be a string' })
  @MinLength(5, {
    message: 'length must be at least $constraint1 characters long',
  })
  @MaxLength(200, {
    message:
      'length must be less than or equal to $constraint1 characters long',
  })
  readonly content: string;

  @IsOptional()
  @IsEnum(EnumCategories, {
    message: `must be one of [${EnumCategories.IDEA}, ${EnumCategories.RANDOM_THOUGHT}, ${EnumCategories.TASK}]`,
  })
  readonly category: string;

  @IsOptional()
  @Type(() => Boolean)
  readonly isActive: boolean;
}

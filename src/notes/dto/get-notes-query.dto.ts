import { Type } from 'class-transformer';
import { IsEnum, IsOptional, Max, Min } from 'class-validator';

export enum EnumOrderBy {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class GetNotesQueryDto {
  @IsOptional()
  @Type(() => Number)
  @Min(2, { message: ' must be greater than or equal to $constraint1' })
  @Max(20, { message: ' must be less than or equal to $constraint1' })
  readonly limit: number;

  @IsOptional()
  @Type(() => Number)
  @Min(1, { message: ' must be greater than or equal to $constraint1' })
  readonly page: number;

  @IsOptional()
  @IsEnum(EnumOrderBy, {
    message: ' must be one of [ASC, DESC]',
  })
  readonly orderBy: string;
}

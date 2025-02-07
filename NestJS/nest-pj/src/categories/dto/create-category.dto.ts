import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: 'The name of the category', maxLength: 255 })
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  name: string;

  @ApiProperty({
    description: 'The description of the category',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MinLength(10)
  description: string;
}

//import { PartialType } from '@nestjs/mapped-types';
//import { CreateEventHallDto } from './create-event-hall.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString, Matches, MaxLength, Min, MinLength } from "class-validator";
// export class UpdateEventHallDto extends PartialType(CreateEventHallDto) {}
export class UpdateEventHallDto {
@ApiProperty({ default: 'los jazmines' })
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  @MinLength(4, { message: 'Name must be at least 4 characters' })
  @MaxLength(100, { message: 'Name must be at most 100 characters' })
  name?: string;

  @ApiProperty({ default: 'Dorrego 1598' })
  @IsOptional()
  @IsString({ message: 'Location must be a string' })
  @MinLength(4, { message: 'Location must be at least 4 characters' })
  @MaxLength(100, { message: 'Location must be at most 100 characters' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\s]+$/, {
    message: 'Location must contain letters and at least one number',
  })
  location?: string;

  @ApiProperty({ default: 'Se encuentra entre calles paso y urrutia' })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @MinLength(10, { message: 'Description must be at least 10 characters' })
  @MaxLength(255, { message: 'Description must not exceed 255 characters' })
  description?: string;

  @ApiProperty({ default: 20 })
  @IsOptional()
  @IsNumber({}, { message: 'Capacity must be a number' })
  @Min(20, { message: 'Capacity must be at least 20' })
  capacity?: number;

  @ApiProperty({ default: true })
  @IsOptional()
  @IsBoolean({ message: 'Available must be a boolean' })
  available?: boolean;
}
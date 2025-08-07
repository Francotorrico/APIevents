// import { PartialType } from '@nestjs/mapped-types';
// import { CreateEventDto } from './create-event.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length, MaxLength, MinLength } from 'class-validator';

export class UpdateEventDto {

    @ApiProperty({ example: 'Birthday party' })
    @IsString({ message: 'Name must be a string' })
    @IsOptional()
    @MinLength(4, { message: 'Name must be at least 4 characters' })
    @MaxLength(100, { message: 'Name must be at most 100 characters' })
    name?: string;

    @ApiProperty({ example: 'Happy birthday party with friends' })
    @IsString({ message: 'Description must be a string' })
    @IsOptional()
    @MinLength(10, { message: 'Description must be at least 10 characters' })
    @MaxLength(255, { message: 'Description must not exceed 255 characters' })
    description?: string;
}

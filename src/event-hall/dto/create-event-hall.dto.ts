import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString, Matches, MaxLength, Min, MinLength } from "class-validator";

export class CreateEventHallDto {

    @ApiProperty({example: 'los jazmines'})
    @IsString({message: 'Name must be a string'})
    @MinLength(4,{message: 'Name must be at least 4 characters'})
    @MaxLength(100,{message: 'Name must be at most 100 characters'})
    name: string;

    @ApiProperty({example: 'Dorrego 1598'})
    @IsString({message: 'Location must be a string'})
    @MinLength(4,{message: 'Location must be at least 4 characters'})
    @MaxLength(100,{message: 'Location must be at most 100 characters'})
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\s]+$/, {
        message: 'Location must contain letters and at least one number',
    })
    location: string;

    @ApiProperty({example: 'Se encuentra entre calles paso y urrutia'})
    @IsString({message: 'Description must be a string'})
    @MinLength(10, {message: 'Description must be at least 10 characters'})
    @MaxLength(255, { message: 'Description must not exceed 255 characters' })
    description: string;

    @ApiProperty({example: '20'})
    @IsNumber({},{message: 'Capacity must be a number'})
    @Min(20, {message: 'Capacity must be at least 20'})
    capacity: number;

    // por default true sino lo que le mande
    @ApiProperty({example: "true"})
    @IsOptional()
    @IsBoolean({message: 'Available must be a boolean'})
    available?: boolean;


}


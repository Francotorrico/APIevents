import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString, IsUUID, Matches, MaxLength, MinLength } from "class-validator";


export class CreateEventDto {
    @ApiProperty({ example: 'Birthday party' })
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty()
    @MinLength(4, { message: 'Name must be at least 4 characters' })
    @MaxLength(100, { message: 'Name must be at most 100 characters' })
    name: string;

    @ApiProperty({ example: 'Happy birthday party with friends' })
    @IsString({ message: 'Description must be a string' })
    @IsNotEmpty()
    @MinLength(10, { message: 'Description must be at least 10 characters' })
    @MaxLength(255, { message: 'Description must not exceed 255 characters' })
    description: string;

    @ApiProperty({
        example: '2025-08-01 14:30:00',
        description: 'Format: YYYY-MM-DD HH:mm:ss',
    })
    @IsNotEmpty()
    @Matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, {
        message: 'Date must be in format YYYY-MM-DD HH:mm:ss',
    })
    startTime: string;

    @ApiProperty({
        example: '2025-08-01 22:30:00',
        description: 'Format: YYYY-MM-DD HH:mm:ss',
    })
    @Matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, {
        message: 'Date must be in format YYYY-MM-DD HH:mm:ss',
    })    @IsNotEmpty()
    endTime: string;

    @ApiProperty({ example: 'b3e97f38-57cd-42d0-8a20-6d35bde58ad1' })
    @IsNotEmpty()
    @IsUUID(undefined, { message: 'Event hall ID must be a valid UUID' })
    eventHallId: string;

}

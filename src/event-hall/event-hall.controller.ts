import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventHallService } from './event-hall.service';
import { CreateEventHallDto } from './dto/create-event-hall.dto';
import { UpdateEventHallDto } from './dto/update-event-hall.dto';
import { ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('event-hall')
export class EventHallController {
  constructor(private readonly eventHallService: EventHallService) { }

  @Post()
  create(@Body() createEventHallDto: CreateEventHallDto) {
    return this.eventHallService.create(createEventHallDto);
  }

  @Get()
  findAll() {
    return this.eventHallService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventHallService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({
    type: UpdateEventHallDto
    //  examples: {
    //   updateExample: {
    //     // summary: 'Ejemplo válido para actualizar un salón',
    //     value: {
    //       "name": "los bodegones",
    //       "location": "Dorrego 1598",
    //       "description": "Se encuentra entre calles paso y urrutia",
    //       "capacity": 20,
    //       "available": false
    //     },
    //    },
    //  },
  })
  update(@Param('id') id: string, @Body() updateEventHallDto: UpdateEventHallDto) {
    return this.eventHallService.update(id, updateEventHallDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventHallService.remove(id);
  }
}

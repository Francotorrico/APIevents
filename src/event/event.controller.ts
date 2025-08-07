import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  public async create(@Body() createEventDto: CreateEventDto) {
    return await this.eventService.create(createEventDto);
  }

  // a futuro si una persona cliente u empresa tiene varios eventos reservados
  // @Get()
  // findAll() {
  //   return this.eventService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  // solo nombre y descripcion
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(id, updateEventDto);
  }

  @Delete('confirm/:id')
  confirmEvent(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
  @Delete('cancel/:id')
  cancelEvent(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
// import { zonedTimeToUtc } from 'date-fns-tz';
import * as moment from 'moment-timezone';
import { isUUID } from 'class-validator';
import { EventHallService } from 'src/event-hall/event-hall.service';

@Injectable()
export class EventService {
  constructor(
    private prisma: PrismaService,
    private eventHallService: EventHallService
  ) {}

  public async create(createEventDto: CreateEventDto) {
    const timeZone = 'America/Argentina/Buenos_Aires';

    // Parsear la fecha local en Argentina y convertir a UTC
    const start = moment.tz(createEventDto.startTime, 'YYYY-MM-DD HH:mm:ss', timeZone).utc();
    const end = moment.tz(createEventDto.endTime, 'YYYY-MM-DD HH:mm:ss', timeZone).utc();

    if (!start.isValid()) {
      throw new BadRequestException('Start time Invalid date');
    }
    if (!end.isValid()) {
      throw new BadRequestException('End time Invalid date');
    }
    if (start.isBefore(moment.utc())) {
      throw new BadRequestException('Start time Date must be in the future');
    }
    if (end.isBefore(start)) {
      throw new BadRequestException('End time must be greater than start time');
    }

    //valildar eventHall
    const eventHallValidate = await this.eventHallService.validateEventHallId(createEventDto.eventHallId);

    // Obtener inicio y fin del día local
    const dayStart = start.clone().tz(timeZone).startOf('day').utc();
    const dayEnd = start.clone().tz(timeZone).endOf('day').utc();

    // Buscar eventos existentes en la misma sala y ese día
    const overlappingEvents = await this.prisma.event.findMany({
      where: {
        eventHallId: eventHallValidate.id,
        startTime: { lte: dayEnd.toDate() },
        endTime: { gte: dayStart.toDate() },
      },
    });

    if (overlappingEvents.length > 0) {
      throw new BadRequestException('There is already an event scheduled during that time.');
    }



    const createEvent = await this.prisma.event.create({
      data: {
        name: createEventDto.name,
        description: createEventDto.description,
        startTime: start.toDate(),
        endTime: end.toDate(),
        eventHallId: createEventDto.eventHallId,
      },
    })

    return {
      ...createEvent,
      startTime: this.convertToArgTime(createEvent.startTime),
      endTime: this.convertToArgTime(createEvent.endTime),
      createdAt: this.convertToArgTime(createEvent.createdAt),
      updatedAt: this.convertToArgTime(createEvent.updatedAt),
    }
  }


  // findAll() {
  //   return `This action returns all event`;
  // }

  public async findOne(id: string) {
    const eventOne = await this.validateEventId(id);



    return {
      ...eventOne,
      startTime: this.convertToArgTime(eventOne.startTime),
      endTime: this.convertToArgTime(eventOne.endTime),
      createdAt: this.convertToArgTime(eventOne.createdAt),
      updatedAt: this.convertToArgTime(eventOne.updatedAt),
    };
  }

  public async update(id: string, updateEventDto: UpdateEventDto) {
    const event = await this.validateEventId(id);
    const updateEvent = await this.prisma.event.update({
      where: { id: id },
      data: {
        name: updateEventDto.name,
        description: updateEventDto.description,
      }
    });
    return {
      ...updateEvent,
      startTime: this.convertToArgTime(updateEvent.startTime),
      endTime: this.convertToArgTime(updateEvent.endTime),
      createdAt: this.convertToArgTime(updateEvent.createdAt),
      updatedAt: this.convertToArgTime(updateEvent.updatedAt),
    }
  }

  public async remove(id: string) {
    const event = await this.validateEventId(id);

    const deletedEvent = await this.prisma.event.delete({
      where: {
        id: event.id,
      },
    })
    return {
      ...deletedEvent,
      startTime: this.convertToArgTime(deletedEvent.startTime),
      endTime: this.convertToArgTime(deletedEvent.endTime),
      createdAt: this.convertToArgTime(deletedEvent.createdAt),
      updatedAt: this.convertToArgTime(deletedEvent.updatedAt),
    }
  }


  private convertToArgTime(date: Date): string {
    return moment(date).tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD HH:mm:ss');
  }


  private async validateEventId(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(`Invalid UUID format for id: ${id}`);
    }

    const event = await this.prisma.event.findUnique({ where: { id } });

    if (!event) {
      throw new NotFoundException(`Event with id "${id}" not found`);
    }

    return event;
  }
}



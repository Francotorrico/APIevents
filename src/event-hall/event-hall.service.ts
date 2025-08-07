import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventHallDto } from './dto/create-event-hall.dto';
import { UpdateEventHallDto } from './dto/update-event-hall.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { validate as isUUID } from 'uuid';

//adaptar hora argentina
import * as moment from 'moment-timezone';

@Injectable()
export class EventHallService {

  constructor(private prisma: PrismaService) { }

  public async create(createEventHallDto: CreateEventHallDto) {
    const newID = uuidv4();
    console.log(createEventHallDto);
    // pregunto si existe primero
    const existingEventHall = await this.prisma.eventHall.findUnique({
      where: {
        name: createEventHallDto.name,
      },
    })
    if (existingEventHall) {
      console.log(`An event hall with name "${createEventHallDto.name}" already exists.`);
      throw new ConflictException(`An event hall with name "${createEventHallDto.name}" already exists.`);
      // tambien con conflictException da 409
    }

    const eventHall = await this.prisma.eventHall.create({
      data: {
        id: newID,
        ...createEventHallDto,
      }
    });

    const createAtArgentina = this.convertToArgTime(eventHall.createdAt);
    const updateAtArgentina = this.convertToArgTime(eventHall.updatedAt);

    return ({
      ...eventHall,
      createdAt: createAtArgentina,
      updatedAt: updateAtArgentina,
    });
  }


  public async findAll() {
    const eventHalls= await this.prisma.eventHall.findMany()

    return eventHalls.map(eventHall => ({
      ...eventHall,
      createdAt: this.convertToArgTime(eventHall.createdAt),
      updatedAt: this.convertToArgTime(eventHall.updatedAt),
    }));
  }

  public async findOne(id: string) {
    await this.validateEventHallId(id);

    const eventHallWithEvents = await this.prisma.eventHall.findUnique({
      where: {
        id: id,
      },
      include: {
        events: true,
      },
    })
    if (!eventHallWithEvents) {
      // Por seguridad, valido de nuevo
      throw new NotFoundException(`Event hall with id ${id} not found`);
    }


    const eventsWithConvertedTime = eventHallWithEvents.events.map(event => ({
      ...event,
      startTime: this.convertToArgTime(event.startTime),
      endTime: this.convertToArgTime(event.endTime),
      createdAt: this.convertToArgTime(event.createdAt),
      updatedAt: this.convertToArgTime(event.updatedAt),
    }));
    return {
      ...eventHallWithEvents,
      createdAt: this.convertToArgTime(eventHallWithEvents.createdAt),
      updatedAt: this.convertToArgTime(eventHallWithEvents.updatedAt),
      events: eventsWithConvertedTime,
    };
    // return await this.prisma.eventHall.findUnique({
    //   where: {
    //     id: id,
    //   },
    //   include: {
    //     events: true,
    //   },
    // })
  }

  public async update(id: string, updateEventHallDto: UpdateEventHallDto) {

    await this.validateEventHallId(id);
    try {

      const updateEventHalls = await this.prisma.eventHall.update({
        where: { id: id },
        data: updateEventHallDto,
      });
      return {
        ...updateEventHalls,
        createdAt: this.convertToArgTime(updateEventHalls.createdAt),
        updatedAt: this.convertToArgTime(updateEventHalls.updatedAt),
      }
    }
    catch (error) {
      
        if (error.code === 'P2002') {
          throw new ConflictException(`Event hall with id "${id}" already exists`);
        }
        throw error;
    }
  }

  public async remove(id: string) {
    const eventHalls = await this.validateEventHallId(id);
    if(eventHalls.available) {
      throw new BadRequestException(`Event hall with id "${id}" is still available and cannot be deleted`);
    }
    
    const hasActiveEvents = await this.prisma.event.count({
      where: {
        eventHallId: id,
      },
    })
    if (hasActiveEvents >= 1) {
      throw new BadRequestException(`Event hall with id "${id}" has pendient events`);
    }
    const deleteEventHall = await this.prisma.eventHall.delete({
      where: {
        id: id,
      },
    })
    return {
      ...deleteEventHall,
      createdAt: this.convertToArgTime(deleteEventHall.createdAt),
      updatedAt: this.convertToArgTime(deleteEventHall.updatedAt),
    }
  }


  public async validateEventHallId(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(`Invalid UUID format for id: ${id}`);
    }

    const eventHall = await this.prisma.eventHall.findUnique({ where: { id } });

    if (!eventHall) {
      throw new NotFoundException(`Event Hall with id "${id}" not found`);
    }

    return eventHall;
  }

  private convertToArgTime(date: Date): string {
    return moment(date).tz('America/Argentina/Buenos_Aires').format('YYYY-MM-DD HH:mm:ss');
  }
}

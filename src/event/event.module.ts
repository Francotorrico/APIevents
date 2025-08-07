import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { EventHallModule } from 'src/event-hall/event-hall.module';

@Module({
  controllers: [EventController],
  providers: [EventService],
  imports: [EventHallModule],
})
export class EventModule {}

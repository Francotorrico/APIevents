import { Module } from '@nestjs/common';
import { EventHallService } from './event-hall.service';
import { EventHallController } from './event-hall.controller';

@Module({
  controllers: [EventHallController],
  providers: [EventHallService],
  exports: [EventHallService],
})
export class EventHallModule {}

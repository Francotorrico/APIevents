import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventHallModule } from './event-hall/event-hall.module';
import { EventModule } from './event/event.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [EventHallModule, EventModule,PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

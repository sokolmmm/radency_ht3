import { DatesModule } from './../dates/dates.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Note } from './notes.model';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

@Module({
  controllers: [NotesController],
  providers: [NotesService],
  imports: [SequelizeModule.forFeature([Note]), DatesModule],
})
export class NotesModule {}

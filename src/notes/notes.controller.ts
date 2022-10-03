import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';

import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { GetNotesQueryDto } from './dto/get-notes-query.dto';
import { ValidationPipe } from './../pipes/validation.pipe';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}
  @UsePipes(ValidationPipe)
  @Post()
  crateNote(@Body() noteDto: CreateNoteDto) {
    return this.notesService.createUser(noteDto);
  }

  @UsePipes(ValidationPipe)
  @Get()
  getAllNotes(@Query() getNotesQueryDto: GetNotesQueryDto) {
    return this.notesService.getAllNotes(getNotesQueryDto);
  }

  @Get('/stats')
  getStats() {
    return this.notesService.getStats();
  }

  @Get('/:noteId')
  getNoteById(@Param('noteId') noteId: string) {
    return this.notesService.getNoteById(noteId);
  }

  @Delete('/:noteId')
  deleteNoteById(@Param('noteId') noteId: string) {
    return this.notesService.deleteNoteById(noteId);
  }

  @Patch('/:noteId')
  updateNoteById(
    @Param('noteId') id: string,
    @Body(new ValidationPipe())
    noteDto: UpdateNoteDto,
  ) {
    return this.notesService.updateNoteById(id, noteDto);
  }
}

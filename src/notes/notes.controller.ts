import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post()
  crateNote(@Body() noteDto: CreateNoteDto) {
    return this.notesService.createUser(noteDto);
  }

  @Get()
  getAllNotes(
    @Query('limit') limit: number,
    @Query('page') page: number,
    @Query('orderBy') orderBy: string,
  ) {
    return this.notesService.getAllNotes(limit, page, orderBy);
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
    @Param('noteId') noteId: string,
    @Body() noteDto: UpdateNoteDto,
  ) {
    return this.notesService.updateNoteById(noteId, noteDto);
  }
}

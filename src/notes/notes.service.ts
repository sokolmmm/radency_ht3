import sequelize from 'sequelize';

import { InjectModel } from '@nestjs/sequelize';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Note, EnumCategories } from './notes.model';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { GetNotesQueryDto, EnumOrderBy } from './dto/get-notes-query.dto';
import { DatesService } from './../dates/dates.service';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note) private noteRepository: typeof Note,
    private datesService: DatesService,
  ) {}

  async createUser(dto: CreateNoteDto) {
    const noteData = {
      ...dto,
      created: this.datesService.getFormattedNowDate(),
      dates: this.datesService.getDatesFromText(dto.content),
      isActive: true,
    };

    const note = await this.noteRepository.create(noteData);

    return note;
  }

  async getAllNotes(getNotesQueryDto: GetNotesQueryDto) {
    const take = getNotesQueryDto.limit || 20;
    const offset = take * (getNotesQueryDto.page - 1 || 0);
    const order = getNotesQueryDto.orderBy || EnumOrderBy.ASC;

    const notes = await this.noteRepository.findAll({
      limit: take,
      offset,
      order: [[sequelize.literal('id'), order]],
    });

    return notes;
  }

  async getNoteById(id: string) {
    console.log(id);
    const note = await this.noteRepository.findByPk(id);

    if (!note) {
      throw new HttpException(
        `The note with id: ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return note;
  }

  async updateNoteById(id: string, dto: UpdateNoteDto) {
    const note = await this.getNoteById(id);

    await note.update(dto);

    return note;
  }

  async deleteNoteById(id: string) {
    const note = await this.noteRepository.destroy({ where: { id } });
    console.log(note);

    if (!note) {
      throw new HttpException(
        `The note with id: ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return null;
  }

  async getStats() {
    const categories = [
      EnumCategories.IDEA,
      EnumCategories.RANDOM_THOUGHT,
      EnumCategories.TASK,
    ];

    const result = await Promise.all(
      categories.map(async (category) => {
        const active = await this.noteRepository.findAndCountAll({
          where: { category, isActive: true },
        });

        const archived = await this.noteRepository.findAndCountAll({
          where: { category, isActive: false },
        });
        return { category, active: active.count, archived: archived.count };
      }),
    );

    return result;
  }
}

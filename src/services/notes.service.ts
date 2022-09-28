import DateUtils from '../helpers/datesUtils';
import noteEntity from '../repositories/note';

import { NotFoundError } from '../helpers/errors';
import {
  EnumOrderBy,
  EnumCategories,
  ICreateNotePayload,
  ISearchNotesParams,
  IUpdateNotePayload,
  ISummaryByCategories,
} from '../types';

export default class NotesService {
  static createNote(payload: ICreateNotePayload) {
    const newNote = {
      name: payload.name,
      category: payload.category,
      content: payload.content,
      created: DateUtils.getFormattedNowDate(),
      dates: DateUtils.getDatesFromText(payload.content),
      isActive: true,
    };

    return noteEntity.createNote(newNote);
  }

  static getNotesBySearchParams(params: ISearchNotesParams) {
    const limit = params.limit || 20;

    const take = limit;
    const skip = limit * (params.page - 1) || 0;
    const orderBy = params.orderBy || EnumOrderBy.ASC;

    const notes = noteEntity.getNotesBySearchParams(skip, take, orderBy);

    return notes;
  }

  static getNoteById(id: string) {
    const note = noteEntity.getNote(id);

    if (!note) throw new NotFoundError(`The note with id: ${id} doesn't exist`);

    return note;
  }

  static updateNoteById(id: string, payload: IUpdateNotePayload) {
    const note = noteEntity.updateNote(id, payload);

    if (!note) throw new NotFoundError(`The note  with id: ${id} doesn't exist`);

    return note;
  }

  static deleteNoteById(id: string) {
    const note = noteEntity.deleteNote(id);

    if (!note) throw new NotFoundError(`The note with id: ${id} doesn't exist`);

    return note;
  }

  static getStats() {
    const categories = [EnumCategories.IDEA, EnumCategories.RANDOM_THOUGHT, EnumCategories.TASK];

    const stats: ISummaryByCategories[] = categories.map((category) => noteEntity.getStatsByCategory(category));

    return stats;
  }
}

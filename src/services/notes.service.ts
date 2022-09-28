import DateUtils from '../helpers/datesUtils';
import noteEntity from '../repositories/note';

import {
  EnumOrderBy, ICreateNotePayload, ISearchNotesParams, IUpdateNotePayload,
} from '../types';
import { NotFoundError } from '../helpers/errors';

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

  static patchNote(id: number, payload: IUpdateNotePayload) {
    const note = noteEntity.patchNote(id, payload);

    if (!note) throw new NotFoundError(`The note  with id: ${id} doesn't exist`);

    return note;
  }

  static getAllNotes(params: ISearchNotesParams) {
    const limit = params.limit || 20;

    const skip = limit * (params.page - 1) || 0;
    const take = limit;
    const orderBy = params.orderBy || EnumOrderBy.ASC;

    const notes = noteEntity.getAllNotes(skip, take, orderBy);

    return notes;
  }

  static getNoteById(id: string) {
    const note = noteEntity.getById(id);

    if (!note) throw new NotFoundError(`The note with id: ${id} doesn't exist`);

    return note;
  }

  static deleteNote(id: string) {
    const note = noteEntity.deleteNote(id);

    if (!note) throw new NotFoundError(`The note with id: ${id} doesn't exist`);

    return note;
  }
}

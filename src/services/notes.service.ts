import DateUtils from '../helpers/datesUtils';
import noteEntity from '../repositories/note';

import { ICreateNotePayload, IUpdateNotePayload } from '../types';
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

  static patchNote(noteId: number, payload: IUpdateNotePayload) {
    const note = noteEntity.patchNote(noteId, payload);

    if (!note) throw new NotFoundError(`User with id: ${noteId} doesn't exist`);

    return note;
  }
}

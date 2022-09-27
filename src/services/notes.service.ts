import { v4 as uuidv4 } from 'uuid';

import DateUtils from '../helpers/datesUtils';
import note from '../repositories/note';

import { ICreateNotePayload } from '../types';

export default class NotesService {
  static createNote(payload: ICreateNotePayload) {
    const newNote = {
      id: uuidv4(),
      name: payload.name,
      category: payload.category,
      content: payload.content,
      created: DateUtils.getFormattedNowDate(),
      dates: DateUtils.getDatesFromText(payload.content),
      isActive: true,
    };

    return note.createUser(newNote);
  }
}

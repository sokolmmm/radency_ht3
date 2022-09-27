import { Context } from 'koa';

import NotesService from '../services/notes.service';
import { ICreateNotePayload } from '../types';

export default class NotesController {
  static createUser(ctx: Context) {
    const payload: ICreateNotePayload = ctx.request.body;

    const note = NotesService.createNote(payload);

    ctx.body = note;
  }
}

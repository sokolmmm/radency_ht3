import { Context } from 'koa';

import NotesService from '../services/notes.service';
import NotesValidator from '../helpers/validator';

import { ICreateNotePayload } from '../types';

export default class NotesController {
  static createNote(ctx: Context) {
    const payload: ICreateNotePayload = ctx.request.body;

    NotesValidator.validateCreateNotePayload(payload);

    const note = NotesService.createNote(payload);

    ctx.body = note;
  }
}

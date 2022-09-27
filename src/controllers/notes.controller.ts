import { Context } from 'koa';

import NotesService from '../services/notes.service';
import NotesValidator from '../helpers/validator';

import { ICreateNotePayload, IUpdateNotePayload } from '../types';

export default class NotesController {
  static createNote(ctx: Context) {
    const payload: ICreateNotePayload = ctx.request.body;

    NotesValidator.validateCreateNotePayload(payload);

    const note = NotesService.createNote(payload);

    ctx.body = note;
  }

  static updateNote(ctx: Context) {
    const { noteId } = ctx.params;

    const payload: IUpdateNotePayload = ctx.request.body;

    NotesValidator.validateUpdateNotePayload(payload);

    const note = NotesService.patchNote(noteId, payload);

    ctx.body = note;
  }
}

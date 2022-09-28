import { Context } from 'koa';

import NotesService from '../services/notes.service';
import NotesValidator from '../helpers/validator';

import { ICreateNotePayload, ISearchNotesParams, IUpdateNotePayload } from '../types';

export default class NotesController {
  static createNote(ctx: Context) {
    const payload: ICreateNotePayload = ctx.request.body;

    NotesValidator.validateCreateNotePayload(payload);

    const note = NotesService.createNote(payload);

    ctx.body = note;
  }

  static getAllNotes(ctx: Context) {
    const searchParams: ISearchNotesParams = ctx.query;

    NotesValidator.validateSearchNotesParams(searchParams);

    const notes = NotesService.getAllNotes(searchParams);

    ctx.body = notes;
  }

  static updateNote(ctx: Context) {
    const { id } = ctx.params;

    const payload: IUpdateNotePayload = ctx.request.body;

    NotesValidator.validateUpdateNotePayload(payload);

    const note = NotesService.patchNote(id, payload);

    ctx.body = note;
  }

  static getNoteById(ctx: Context) {
    const { id } = ctx.params;

    const note = NotesService.getNoteById(id);

    ctx.body = note;
  }

  static deleteNote(ctx: Context) {
    const { id } = ctx.params;

    NotesService.deleteNote(id);

    ctx.response.status = 204;
  }
}

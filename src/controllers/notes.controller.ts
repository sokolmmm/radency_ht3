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

  static getNotesBySearchParams(ctx: Context) {
    const searchParams: ISearchNotesParams = ctx.query;

    NotesValidator.validateSearchNotesParams(searchParams);

    const notes = NotesService.getNotesBySearchParams(searchParams);

    ctx.body = notes;
  }

  static updateNoteById(ctx: Context) {
    const { id } = ctx.params;

    const payload: IUpdateNotePayload = ctx.request.body;

    NotesValidator.validateUpdateNotePayload(payload);

    const note = NotesService.updateNoteById(id, payload);

    ctx.body = note;
  }

  static getNoteById(ctx: Context) {
    const { id } = ctx.params;

    const note = NotesService.getNoteById(id);

    ctx.body = note;
  }

  static deleteNoteById(ctx: Context) {
    const { id } = ctx.params;

    NotesService.deleteNoteById(id);

    ctx.response.status = 204;
  }

  static getStats(ctx: Context) {
    const stats = NotesService.getStats();

    ctx.body = stats;
  }
}

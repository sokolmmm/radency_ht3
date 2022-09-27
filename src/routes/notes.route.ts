import Router from 'koa-router';

import NotesController from '../controllers/notes.controller';

const notesRouter = new Router();

notesRouter.post('/notes', NotesController.createNote);

notesRouter.patch('/notes/:noteId', NotesController.updateNote);

export default notesRouter;

import Router from 'koa-router';

import NotesController from '../controllers/notes.controller';

const notesRouter = new Router();

notesRouter.post('/notes', NotesController.createNote);

notesRouter.patch('/notes/:id', NotesController.createNote);

export default notesRouter;

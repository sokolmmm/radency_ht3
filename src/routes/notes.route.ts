import Router from 'koa-router';

import NotesController from '../controllers/notes.controller';

const notesRouter = new Router();

notesRouter.post('/notes', NotesController.createNote);
notesRouter.get('/notes', NotesController.getAllNotes);

notesRouter.patch('/notes/:id', NotesController.updateNote);
notesRouter.get('/notes/:id', NotesController.getNoteById);
notesRouter.delete('/notes/:id', NotesController.deleteNote);

export default notesRouter;

import Router from 'koa-router';

import NotesController from '../controllers/notes.controller';

const notesRouter = new Router();

notesRouter.post('/notes', NotesController.createNote);
notesRouter.get('/notes', NotesController.getNotesBySearchParams);

notesRouter.get('/notes/stats', NotesController.getStats);

notesRouter.get('/notes/:id', NotesController.getNoteById);
notesRouter.patch('/notes/:id', NotesController.updateNoteById);
notesRouter.delete('/notes/:id', NotesController.deleteNoteById);

export default notesRouter;

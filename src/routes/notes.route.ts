import Router from 'koa-router';

import NotesController from '../controllers/notes.controller';

const notesRouter = new Router();

notesRouter.post('/notes', NotesController.createUser);

export default notesRouter;

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import config from './config/config';
import errorCatcher from './middleware/errorCatcher';
import notesRouter from './routes/notes.route';

const app = new Koa();

app.use(bodyParser());

app.use(errorCatcher);

app.use(notesRouter.routes());

app.listen(4000, () => {
  console.log(`This server runs on local host using port ${config.port}.`);
});
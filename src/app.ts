import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import cors from '@koa/cors';

import { koaSwagger } from 'koa2-swagger-ui';

import config from './config/config';
import notesRouter from './routes/notes.route';
import errorCatcher from './middleware/errorCatcher';

const app = new Koa();

app.use(serve('src/docs'));
app.use(
  koaSwagger({
    routePrefix: '/docs',
    hideTopbar: true,
    swaggerOptions: {
      url: `${config.server.baseUrl}/docs.yml`,
    },
  }),
);

app.use(cors());

app.use(bodyParser());

app.use(errorCatcher);

app.use(notesRouter.routes());

app.listen(config.port, () => {
  console.log(`This server runs on local host using port ${config.port}.`);
});

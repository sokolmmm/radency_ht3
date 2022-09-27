import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import config from './config/config';

const app = new Koa();

app.use(bodyParser());

app.listen(4000, () => {
  console.log(`This server runs on local host using port ${config.port}.`);
});

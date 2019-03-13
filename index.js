const Koa = require('koa');
const logger = require('koa-pino-logger');
const render = require('koa-ejs');
const path = require('path');
const cors = require('koa2-cors');
const helmet = require('koa-helmet');
const { router } = require('./routes/router');

const app = new Koa();

app.use(logger({
  prettyPrint: true,
})).use(router.routes())
  .use(router.allowedMethods())
  .use(cors())
  .use(helmet());

render(app, {
  root: path.join(__dirname, 'views'),
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: true,
});


const PORT = process.env.PORT || 3700;
app.listen(PORT);

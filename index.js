const Koa = require('koa');
const logger = require('koa-pino-logger');
const render = require('koa-ejs');
const path = require('path');
const cors = require('koa2-cors');
const helmet = require('koa-helmet');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const { router } = require('./routes/router');

const app = new Koa();

app.use(logger({
  prettyPrint: true,
})).use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(cors())
  .use(helmet())
  .use(serve(__dirname, './dist'));

render(app, {
  root: path.join(__dirname, 'views'),
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: true,
});


const PORT = process.env.PORT || 3700;
app.listen(PORT);

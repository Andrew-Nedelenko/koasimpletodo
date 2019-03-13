const Router = require('koa-router');

const router = new Router();

router.get('/', async (ctx) => {
  await ctx.render('index', {
    msg: 'hi',
  });
});


module.exports = {
  router,
};

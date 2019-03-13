const Router = require('koa-router');
const { root } = require('../controllers/common');
const list = require('../controllers/lists');

const router = new Router();

router.get('/', root);
router.get('/list', list.getAllList);
router.get('/api/list', list.apiList);
router.get('/add', list.getToAdd);
router.post('/list', list.postTask);

module.exports = {
  router,
};

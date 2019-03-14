const { selfList } = require('../model/Post');

const delTask = async (ctx) => {
  const { title } = ctx.request.body;
  if (title === '') {
    ctx.status = 404;
  } else {
    await selfList.destroy({
      where: {
        title,
      },
    });
    ctx.status = 201;
  }
};

module.exports = delTask;

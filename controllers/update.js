const { selfList } = require('../model/Post');

const updateData = async (ctx) => {
  const {
    initialTitle, title, content, check,
  } = ctx.request.body;
  if (title === '') {
    ctx.status = 404;
  } else {
    const findPrev = await selfList.findOne({
      where: {
        title: initialTitle,
      },
    });
    if (findPrev) {
      await selfList.update({ title, content, check }, {
        where: {
          title: initialTitle,
        },
      });
      ctx.status = 201;
    }
  }
};

module.exports = updateData;

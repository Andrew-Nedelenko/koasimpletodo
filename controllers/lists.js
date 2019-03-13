const { selfList } = require('../model/Post');

const getAllList = async (ctx) => {
  await ctx.render('list', {
    title: 'List',
  });
};

const apiList = async (ctx) => {
  const lists = await selfList.findAll();
  ctx.body = lists;
};

const getToAdd = async (ctx) => {
  await ctx.render('add', {
    title: 'add',
  });
};

const postTask = async (ctx) => {
  const { title, content } = ctx.request.body;

  console.log(ctx.request.body);

  if (title === '') {
    ctx.status = 404;
    ctx.message = 'title not found';
  } else {
    await selfList.create({
      title,
      content,
      date: Date.now(),
    });
    ctx.status = 201;
    ctx.message = 'post created';
  }
};

module.exports = {
  getAllList, getToAdd, postTask, apiList,
};

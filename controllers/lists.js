const getAllList = async (ctx) => {
  await ctx.render('list', {
    title: 'List',
  });
};

const getToAdd = async (ctx) => {
  await ctx.render('add', {
    title: 'add',
  });
};

const postTask = async (ctx) => {
  setTimeout(() => {
    console.log(ctx.request.body);
  }, 10);
};

module.exports = {
  getAllList, getToAdd, postTask,
};

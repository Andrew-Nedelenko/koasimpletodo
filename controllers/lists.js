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

module.exports = {
  getAllList, getToAdd,
};

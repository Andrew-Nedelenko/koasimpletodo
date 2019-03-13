const root = async (ctx) => {
  await ctx.render('index', {
    title: 'Main',
  });
};

module.exports = {
  root,
};

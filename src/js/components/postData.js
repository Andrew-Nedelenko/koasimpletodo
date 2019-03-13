const PostData = () => {
  const formData = {
    form: document.querySelector('.form'),
    title: document.querySelector("input[name='title']"),
    description: document.querySelector("textarea[name='content']"),
    error: document.querySelector('.error'),
    define: document.querySelector('.define'),
  };

  const postData = async (title, content, url) => {
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        title,
        content,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  if (formData.form) {
    formData.form.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log(formData.title.value, formData.description.value);
      if (formData.title.value === '') {
        formData.error.innerHTML = 'enter the title';
        setTimeout(() => { formData.error.innerHTML = ''; }, 10000);
      } else {
        postData(formData.title.value, formData.description.value, 'http://localhost:3700/list');
        // eslint-disable-next-line no-restricted-globals
        location.replace('/list');
      }
    });
  }
};

module.exports = {
  PostData,
};
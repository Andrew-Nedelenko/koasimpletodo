const postData = async (title, content, url, method) => {
  await fetch(url, {
    method,
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const updateData = async (initialTitle, title, content, url, method) => {
  await fetch(url, {
    method,
    body: JSON.stringify({
      initialTitle,
      title,
      content,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
const PostData = () => {
  const formData = {
    form: document.querySelector('.form'),
    title: document.querySelector("input[name='title']"),
    description: document.querySelector("textarea[name='content']"),
    error: document.querySelector('.error'),
    define: document.querySelector('.define'),
  };


  if (formData.form) {
    formData.form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (formData.title.value === '') {
        formData.error.innerHTML = 'enter the title';
        setTimeout(() => { formData.error.innerHTML = ''; }, 10000);
      } else {
        postData(formData.title.value, formData.description.value, 'http://192.168.7.39:3700/list', 'POST');
        // eslint-disable-next-line no-restricted-globals
        location.replace('/list');
      }
    });
  }
};


module.exports = {
  PostData, postData, updateData,
};

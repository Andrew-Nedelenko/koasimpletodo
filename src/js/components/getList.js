import { postData } from './postData';

const listContainer = document.querySelector('.listContainer');

const getData = async (url) => {
  const data = await fetch(url);
  const json = await data.json();
  const arrs = json;
  if (arrs.length > 0) {
    for (const arr of arrs) {
      const div = document.createElement('div');
      div.classList = 'innerCont';
      div.innerHTML = `
        <h2>${arr.title}</h2>
        <h3>${arr.content}</h3>
        <h4>Status: <i class="fas fa-check"></i> </h4>
        <i class="fas fa-pencil-alt"></i>
        <i class="fas fa-times"></i>
      `;
      listContainer.appendChild(div);
    }
  } else {
    listContainer.innerHTML = `
      <div class='empty'>no current assignments</div>
    `;
  }

  const innerCont = {
    all: document.querySelectorAll('.innerCont'),
    title: document.querySelectorAll('.innerCont h2'),
    update: document.querySelectorAll('.fa-pencil-alt'),
    delete: document.querySelectorAll('.fa-times'),
    openModal: document.querySelector('.openModal'),
  };


  const openDelModal = (num) => {
    if (num < 0) {
      return false;
    }
    innerCont.openModal.style.display = 'flex';
    innerCont.openModal.innerHTML = `
       <div class="innerModal">
        <p>Are your sure delete ${innerCont.title[num].textContent}?</p>
        <div class="confirm">
            <span>Yes</span>
            <span>No</span>
        </div>
    </div>
    `;

    const confirm = document.querySelectorAll('.confirm span');
    confirm[1].addEventListener('click', () => {
      innerCont.openModal.style.display = 'none';
      innerCont.openModal.innerHTML = '';
    });

    confirm[0].addEventListener('click', () => {
      innerCont.openModal.style.display = 'none';
      innerCont.openModal.innerHTML = '';
      const title = innerCont.title[num].textContent;
      postData(title, '', 'http://192.168.7.39:3700/delete', 'DELETE');
      listContainer.innerHTML = '';
      getData('http://192.168.7.39:3700/api/list');
    });
    return 1;
  };

  for (let i = 0; i <= innerCont.delete.length; i += 1) {
    if (innerCont.delete[i]) {
      innerCont.delete[i].addEventListener('click', () => {
        openDelModal(i);
      });
    }
  }
};

if (listContainer) {
  getData('http://192.168.7.39:3700/api/list');
}

export default getData;

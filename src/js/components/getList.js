import { postData, updateData } from './postData';

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
    content: document.querySelectorAll('.innerCont h3'),
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
      postData(innerCont.title[num].textContent, '', 'http://192.168.7.39:3700/delete', 'DELETE');
      listContainer.innerHTML = '';
      getData('http://192.168.7.39:3700/api/list');
    });
    return 1;
  };

  const openUpdateModal = (num) => {
    if (num < 0) {
      return false;
    }
    innerCont.openModal.style.display = 'flex';
    innerCont.openModal.innerHTML = `
      <div class="updateField">
          <i class="far fa-times-circle"></i>
        <form>
              <h2>Update ${innerCont.title[num].textContent}</h2>
            <input type="text" name="titleUpdate" value="${innerCont.title[num].textContent}">
            <textarea name="contentUpdate" id="" cols="30" rows="10">${innerCont.content[num].textContent}</textarea>
            <label for="check">
                  <input type="checkbox">
                  Status
            </label>
            <input type="submit" value="Submit" name='update'>
        </form>
    </div>
    `;

    const closeUpdateModal = document.querySelector('.fa-times-circle');
    const title = document.querySelector("input[name='titleUpdate']");
    const content = document.querySelector("textarea[name='contentUpdate']");
    if (closeUpdateModal) {
      closeUpdateModal.addEventListener('click', () => {
        innerCont.openModal.style.display = 'none';
        innerCont.openModal.innerHTML = '';
      });
    }

    const updateForm = document.querySelector('.updateField form');
    if (updateForm) {
      updateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        innerCont.openModal.style.display = 'none';
        innerCont.openModal.innerHTML = '';
        updateData(innerCont.title[num].textContent, title.value, content.value, 'http://192.168.7.39:3700/update', 'POST');
        listContainer.innerHTML = '';
        setTimeout(() => { getData('http://192.168.7.39:3700/api/list'); }, 1000);
      });
    }
    return 1;
  };

  for (let i = 0; i <= innerCont.delete.length; i += 1) {
    if (innerCont.delete[i]) {
      innerCont.delete[i].addEventListener('click', () => {
        openDelModal(i);
      });
    }
  }

  for (let i = 0; i <= innerCont.update.length; i += 1) {
    if (innerCont.update[i]) {
      innerCont.update[i].addEventListener('click', () => {
        openUpdateModal(i);
      });
    }
  }
};


if (listContainer) {
  getData('http://192.168.7.39:3700/api/list');
}

export default getData;

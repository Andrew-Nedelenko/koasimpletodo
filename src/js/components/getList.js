const listContainer = document.querySelector('.listContainer');

const getData = async (url) => {
  const data = await fetch(url);
  const json = await data.json();
  console.log(json);
};

if (listContainer) {
  getData('http://localhost:3700/api/list');
}

export default getData;

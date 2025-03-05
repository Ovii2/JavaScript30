'use strict';

const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];
const clearBtn = document.querySelector('.clear');

const addItem = (e) => {
  e.preventDefault();
  const text = e.target.querySelector('[name=item]').value;
  const item = {
    text,
    done: false,
  };
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
  e.target.reset();
};

const populateList = (plates = [], platesList) => {
  platesList.innerHTML = plates
    .map((plate, i) => {
      return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''}>
        <label for="item${i}">${plate.text}</label>
      </li>
        `;
    })
    .join('');
};

const toggleDone = (e) => {
  if (!e.target.matches('input')) return;
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
};

const clearItems = () => {
  localStorage.clear();
  items.length = 0;
  populateList(items, itemsList);
};

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
clearBtn.addEventListener('click', clearItems);

populateList(items, itemsList);

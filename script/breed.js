'use strict';

// Chọn elements
const inputBreed = document.getElementById('input-breed');
const inputType = document.getElementById('input-type');
const tableBodyEl = document.getElementById('tbody');

const formSubmit = document.getElementById('form');

const nav = document.getElementById('sidebar');

// Bổ sung Animation cho Sidebar
nav.addEventListener('click', function () {
  nav.classList.toggle('active');
});

// Data khởi đầu
const breedArr = JSON.parse(getFromStorage('breedArr'));

// Xóa các data vừa nhập
const clearInput = () => {
  inputBreed.value = '';
  inputType.value = 'Select Type';
};

// Lấy data Breed từ LocalStorage và hiển thị trong bảng
const renderBreedTable = (arr) => {
  tableBodyEl.innerHTML = '';

  for (let i = 0; i < arr.length; i++) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <th scope="row">${i + 1}</th>
        <td>${arr[i].name}</td>
        <td>${arr[i].type}</td>
        <td><button type="button" class="btn btn-danger" onclick="deleteBreed('${i}')">Delete</button>
        </td>
    `;

    tableBodyEl.appendChild(row);
  }
};

renderBreedTable(breedArr);

// Xóa Breed
const deleteBreed = (breedId) => {
  if (confirm('Are you sure')) {
    breedArr.splice(breedId, 1);

    saveToStorage('breedArr', JSON.stringify(breedArr));
    renderBreedTable(breedArr);
  }
};

// Event Listener
formSubmit.addEventListener('submit', function () {
  const data = {
    name: inputBreed.value,
    type: inputType.value,
  };

  clearInput();
  breedArr.push(data);
  saveToStorage('breedArr', JSON.stringify(breedArr));
  renderBreedTable(breedArr);
});

'use strict';

// Chọn elements
const inputID = document.getElementById('input-id');
const inputName = document.getElementById('input-name');
const inputType = document.getElementById('input-type');
const inputBreed = document.getElementById('input-breed');
const inputVaccinated = document.getElementById('input-vaccinated');
const inputDewormed = document.getElementById('input-dewormed');
const inputSterilized = document.getElementById('input-sterilized');

const tableBodyEl = document.getElementById('tbody');

const btnFind = document.getElementById('find-btn');

const nav = document.getElementById('sidebar');

// Bổ sung Animation cho Sidebar
nav.addEventListener('click', function () {
  nav.classList.toggle('active');
});

// Data khởi đầu
const petArr = JSON.parse(getFromStorage('petArr'));
const breedArr = JSON.parse(getFromStorage('breedArr'));

// Hiển thị danh sách thú cưng
const renderPet = (arrPet) => {
  tableBodyEl.innerHTML = '';

  arrPet.forEach((pet) => {
    const row = `
          <th scope="row">${pet.id}</th>
          <td>${pet.name}</td>
          <td>${pet.age}</td>
          <td>${pet.type}</td>
          <td>${pet.weight} kg</td>
          <td>${pet.length} cm</td>
          <td>${pet.breed}</td>
          <td>
              <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
          </td>
          <td><i class="bi ${
            pet.vaccinated === true
              ? 'bi-check-circle-fill'
              : 'bi-x-circle-fill'
          }"></i></td>
          <td><i class="bi ${
            pet.dewormed === true ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
          }"></i></td>
          <td><i class="bi ${
            pet.sterilized === true
              ? 'bi-check-circle-fill'
              : 'bi-x-circle-fill'
          }"></i></td>
          <td>${pet.date}</td>
      `;

    tableBodyEl.insertAdjacentHTML('beforeend', row);
  });
};

renderPet(petArr);

// Hiển thị Breed trong màn hình quản lý thú cưng
const renderBreed = (arrBreed) => {
  inputBreed.innerHTML = '<option>Select Breed</option>';

  arrBreed.forEach((breed) => {
    const option = `<option>${breed.name}</option>`;

    inputBreed.insertAdjacentHTML('beforeend', option);
  });
};

renderBreed(breedArr);

// Event Listener
btnFind.addEventListener('click', function (e) {
  e.preventDefault();

  // Lấy data từ các input form
  const data = {
    id: inputID.value,
    name: inputName.value,
    type: inputType.value,
    breed: inputBreed.value,
    vaccinated: inputVaccinated.checked,
    dewormed: inputDewormed.checked,
    sterilized: inputSterilized.checked,
  };

  let findPet = [...petArr];

  if (data.id)
    findPet = findPet.filter((pet) =>
      pet.id.toLowerCase().includes(data.id.toLowerCase())
    );
  if (data.name)
    findPet = findPet.filter((pet) =>
      pet.name.toLowerCase().includes(data.name.toLowerCase())
    );
  if (data.type !== 'Select Type')
    findPet = findPet.filter((pet) => pet.type.includes(data.type));
  if (data.breed !== 'Select Breed')
    findPet = findPet.filter((pet) => pet.breed.includes(data.breed));
  if (data.vaccinated === true)
    findPet = findPet.filter((pet) => pet.vaccinated === true);
  if (data.dewormed === true)
    findPet = findPet.filter((pet) => pet.dewormed === true);
  if (data.sterilized === true)
    findPet = findPet.filter((pet) => pet.sterilized === true);

  renderPet(findPet);
});

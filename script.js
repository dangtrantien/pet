'use strict';

// Chọn elements
const inputID = document.getElementById('input-id');
const inputName = document.getElementById('input-name');
const inputAge = document.getElementById('input-age');
const inputType = document.getElementById('input-type');
const inputWeight = document.getElementById('input-weight');
const inputLength = document.getElementById('input-length');
const inputColor = document.getElementById('input-color-1');
const inputBreed = document.getElementById('input-breed');
const inputVaccinated = document.getElementById('input-vaccinated');
const inputDewormed = document.getElementById('input-dewormed');
const inputSterilized = document.getElementById('input-sterilized');

const tableBodyEl = document.getElementById('tbody');

const btnSubmit = document.getElementById('submit-btn');
const btnHealthy = document.getElementById('healthy-btn');
// const btnCalculateBMI = document.getElementById('calBMI-btn');

const nav = document.getElementById('sidebar');

// Bổ sung Animation cho Sidebar
nav.addEventListener('click', function () {
  nav.classList.toggle('active');
});

// Data khởi đầu
const petArr = JSON.parse(getFromStorage('petArr'));
const breedArr = JSON.parse(getFromStorage('breedArr'));
let healthyPetArr = [];
let healthyCheck = false;
let calculateBMI = false;

// Xóa các data vừa nhập trên form
const clearInput = () => {
  inputID.value = '';
  inputName.value = '';
  inputAge.value = '';
  inputType.value = 'Select Type';
  inputWeight.value = '';
  inputLength.value = '';
  inputBreed.value = 'Select Breed';
  inputColor.value = '#000000';
  inputVaccinated.checked = false;
  inputDewormed.checked = false;
  inputSterilized.checked = false;
};

// Hiển thị danh sách thú cưng
const renderTableData = (arrPet) => {
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
          pet.vaccinated === true ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
        }"></i></td>
        <td><i class="bi ${
          pet.dewormed === true ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
        }"></i></td>
        <td><i class="bi ${
          pet.sterilized === true ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
        }"></i></td>
        <td>${pet.date}</td>
        <td><button type="button" class="btn btn-danger" onclick="deletePet('${
          pet.id
        }')">Delete</button>
        </td>
    `;

    tableBodyEl.insertAdjacentHTML('beforeend', row);
  });
};

renderTableData(petArr);

// Hiển thị Breed trong màn hình quản lý thú cưng
const renderBreed = (arrBreed) => {
  inputBreed.innerHTML = '<option>Select Breed</option>';

  arrBreed.forEach((breed) => {
    const option = `<option>${breed.name}</option>`;

    inputBreed.insertAdjacentHTML('beforeend', option);
  });
};

// Lọc các breed khi Type Input thay đổi
inputType.addEventListener('change', function (e) {
  e.preventDefault();

  const array = breedArr.filter((breed) => breed.type === e.target.value);

  renderBreed(array);
});

// Function render sau khi xóa 1 thú cưng
const handleDelete = (petID, arr) => {
  if (confirm('Are you sure?')) {
    petArr.splice(
      petArr.findIndex((pet) => pet.id === petID),
      1
    );
    healthyPetArr.splice(
      healthyPetArr.findIndex((pet) => pet.id === petID),
      1
    );

    saveToStorage('petArr', JSON.stringify(petArr));
    renderTableData(arr);
  }
};

// Xóa 1 thú cưng
const deletePet = function (petID) {
  if (!healthyCheck) handleDelete(petID, petArr);
  else handleDelete(petID, healthyPetArr);
};

// Bắt event Click vào nút "Submit"
btnSubmit.addEventListener('click', function (e) {
  e.preventDefault();

  // Lấy data từ các input form
  const data = {
    id: inputID.value,
    name: inputName.value,
    age: parseInt(inputAge.value),
    type: inputType.value,
    weight: parseInt(inputWeight.value),
    length: parseInt(inputLength.value),
    breed: inputBreed.value,
    color: inputColor.value,
    vaccinated: inputVaccinated.checked,
    dewormed: inputDewormed.checked,
    sterilized: inputSterilized.checked,
    date: new Date().toLocaleDateString(),
  };

  // Validate data hợp lệ
  // Không có trường nào bị thiếu
  if (!data.id || !data.name || !data.age || !data.weight || !data.length) {
    alert('Please fill all the line!');
    // ID là độc nhất
  } else if (petArr.findIndex((pet) => pet.id === data.id) !== -1) {
    alert('ID must be unique!');
    // Age trong khoảng 1 đến 15
  } else if (data.age < 1 || data.age > 15) {
    alert('Age must be between 1 and 15!');
    // Weight trong khoảng 1 đến 15
  } else if (data.weight < 1 || data.weight > 15) {
    alert('Weight must be between 1 and 15!');
    // Length trong khoảng 1 đến 100
  } else if (data.length < 1 || data.length > 100) {
    alert('Length must be between 1 and 100!');
    // Bắt buộc phải chọn type
  } else if (data.type === 'Select Type') {
    alert('Please select Type!');
    // Bắt buộc phải chọn breed
  } else if (data.breed === 'Select Breed') {
    alert('Please select Breed!');
  } else {
    // Thêm thú cưng vào danh sách
    petArr.push(data);
    saveToStorage('petArr', JSON.stringify(petArr));
    clearInput();
    renderTableData(petArr);
  }
});

// Hiiển thị các thú cưng khỏe mạnh
btnHealthy.addEventListener('click', function (e) {
  e.preventDefault();

  if (!healthyCheck) {
    healthyCheck = true;
    btnHealthy.textContent = 'Show All Pet';

    healthyPetArr = petArr.filter(
      (pet) =>
        pet.vaccinated === true &&
        pet.dewormed === true &&
        pet.sterilized === true
    );

    renderTableData(healthyPetArr);
  } else {
    healthyCheck = false;
    btnHealthy.textContent = 'Show Healthy Pet';

    renderTableData(petArr);
  }
});

// (Nâng cao) Tính toán chỉ số BMI
// btnCalculateBMI.addEventListener('click', function (e) {
//   e.preventDefault();

//   if (!calculateBMI) {
//     calculateBMI = true;

//     if (!healthyCheck) renderTableData(petArr);
//     else renderTableData(healthyPetArr);
//   } else {
//     calculateBMI = false;

//     if (!healthyCheck) renderTableData(petArr);
//     else renderTableData(healthyPetArr);
//   }
// });

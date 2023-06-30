'use strict';

// Chọn elements
const containerForm = document.getElementById('container-form');

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

const formSubmit = document.getElementById('form');

const nav = document.getElementById('sidebar');

// Bổ sung Animation cho Sidebar
nav.addEventListener('click', function () {
  nav.classList.toggle('active');
});

// Data khởi đầu
const petArr = JSON.parse(getFromStorage('petArr'));
const breedArr = JSON.parse(getFromStorage('breedArr'));

// Hiển thị Breed trong màn hình edit thú cưng
const renderBreed = (arrBreed) => {
  inputBreed.innerHTML = '<option>Select Breed</option>';

  arrBreed
    .filter((arr) => arr.type === inputType.value)
    .map((breed) => {
      const option = `<option>${breed.name}</option>`;

      inputBreed.insertAdjacentHTML('beforeend', option);
    });
};

// Lọc các breed khi Type Input thay đổi
inputType.addEventListener('change', function (e) {
  e.preventDefault();

  renderBreed(breedArr);
});

// Hiển thị danh sách thú cưng
const renderPet = (arrPet) => {
  tableBodyEl.innerHTML = '';

  arrPet.map((pet) => {
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
        <td><button type="button" class="btn btn-warning" onclick="startEditPet('${
          pet.id
        }')">Edit</button>
        </td>
    `;

    tableBodyEl.insertAdjacentHTML('beforeend', row);
  });
};

renderPet(petArr);

// Gán các value cho input form
const startEditPet = function (petId) {
  containerForm.classList.remove('hide');

  petArr.map((pet) => {
    if (pet.id === petId) {
      inputID.value = petId;
      inputName.value = pet.name;
      inputAge.value = pet.age;
      inputType.value = pet.type;
      inputWeight.value = pet.weight;
      inputLength.value = pet.length;
      inputBreed.value = pet.breed;
      inputColor.value = pet.color;
      inputVaccinated.checked = pet.vaccinated;
      inputDewormed.checked = pet.dewormed;
      inputSterilized.checked = pet.sterilized;
    }
  });

  renderBreed(breedArr);
};

// Event Listener
formSubmit.addEventListener('submit', function (e) {
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
  };

  // Validate data hợp lệ
  // Age trong khoảng 1 đến 15
  if (data.age < 1 || data.age > 15) {
    return alert('Age must be between 1 and 15!');
    // Weight trong khoảng 1 đến 15
  } else if (data.weight < 1 || data.weight > 15) {
    return alert('Weight must be between 1 and 15!');
    // Length trong khoảng 1 đến 100
  } else if (data.length < 1 || data.length > 100) {
    return alert('Length must be between 1 and 100!');
    // Bắt buộc phải chọn type
  } else if (data.type === 'Select Type') {
    return alert('Please select Type!');
    // Bắt buộc phải chọn breed
  } else if (data.breed === 'Select Breed') {
    return alert('Please select Breed!');
  } else {
    // Edit thú cưng
    petArr.map((pet) => {
      if (pet.id === data.id) {
        pet.name = data.name;
        pet.age = data.age;
        pet.type = data.type;
        pet.weight = data.weight;
        pet.length = data.length;
        pet.breed = data.breed;
        pet.color = data.color;
        pet.vaccinated = data.vaccinated;
        pet.dewormed = data.dewormed;
        pet.sterilized = data.sterilized;
      }
    });

    saveToStorage('petArr', JSON.stringify(petArr));
    containerForm.classList.add('hide');
    renderPet(petArr);
  }
});

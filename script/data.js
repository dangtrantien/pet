'use strict';

// Chọn elements
const inputFile = document.getElementById('input-file');

const btnImport = document.getElementById('import-btn');
const btnExport = document.getElementById('export-btn');

// Lấy data trong LocalStorage
const petArr = getFromStorage('petArr');

// Export data
const saveDynamicDataToFile = function (e) {
  e.preventDefault();

  // Đổi data sang file JSON
  const file = new Blob([petArr], { type: 'json;charset=utf-8' });

  // Tải file về máy
  saveAs(file, 'petArr.json');
};

// Import data
let file;

const uploadFileToData = function (event) {
  event.preventDefault();

  // Kiểm tra file's type = JSON
  if (!file.type.includes('json')) alert('Please choose JSON file only!');
  else {
    // Đọc file
    let fileReader = new FileReader();

    fileReader.readAsText(file);

    // Đổi file sang data và lưu vào LocalStorage
    fileReader.onload = function (e) {
      const fileArr = JSON.parse(e.target.result);
      const pets = JSON.parse(petArr);
      const uniqueID = [];

      // Lưu id độc nhất
      // const unique = new Set(fileArr.map((data) => data.id));
      fileArr.map((data) => uniqueID.push(data.id));

      // Lọc pet có id độc nhất và hợp 2 array lại làm một
      // const uniquePet = pets.filter((pet) => !unique.has(pet.id));
      const uniquePet = pets.filter(
        (pet) => !uniqueID.some((id) => id === pet.id)
      );

      const merged = fileArr.concat(uniquePet);

      saveToStorage('petArr', JSON.stringify(merged));

      alert('Your file have been upload.');
    };
  }
};

// Event Listener
inputFile.addEventListener('change', function (e) {
  // Kiểm tra khả năng upload và đọc file của window
  if (typeof window.FileReader !== 'function')
    alert("The file API isn't supported on this browser.");

  let input = e.target;

  if (!input) alert('The browser dose not properly implement the event object');
  else if (!input.files)
    alert(
      "This browser dose not support the 'files' property of the file input."
    );
  else if (!input.files[0]) return undefined;

  return (file = input.files[0]);
});

btnImport.addEventListener('click', uploadFileToData);

btnExport.addEventListener('click', saveDynamicDataToFile);

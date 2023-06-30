'use strict';

// Lưu data dưới LocalStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

// Lấy data trong LocalStorage
function getFromStorage(key) {
  return localStorage.getItem(key) ?? '[]';
}

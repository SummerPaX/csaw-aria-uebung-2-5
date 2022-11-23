const registerForm = document.getElementById('registerForm');
const favDialog = document.getElementById('favDialog');
const dataTable = document.getElementById('dataTable');
const registerButton = document.getElementById('registerButton');
const openFormButton = document.getElementById('openFormButton');
const inputs = registerForm.querySelectorAll('input');
const errorContainer = document.getElementById('errorContainer');

// If a browser doesn't support the dialog, then hide the
// dialog contents by default.
if (typeof favDialog.showModal !== 'function') {
  favDialog.hidden = true;
}

function createTable() {
  const dataRow = document.createElement('tr');
  const firstNameElem = document.createElement('td');
  firstNameElem.textContent =
    registerForm.querySelector('#inputFirstName').value;
  dataRow.appendChild(firstNameElem);
  const lastNameElem = document.createElement('td');
  lastNameElem.textContent = registerForm.querySelector('#inputLastName').value;
  dataRow.appendChild(lastNameElem);
  const enmailElem = document.createElement('td');
  enmailElem.textContent = registerForm.querySelector('#inputEmail').value;
  dataRow.appendChild(enmailElem);
  const telElem = document.createElement('td');
  telElem.textContent = registerForm.querySelector('#inputTel').value;
  dataRow.appendChild(telElem);
  const checkElem = document.createElement('td');
  checkElem.textContent = registerForm.querySelector('#inputCheck').checked
    ? 'Checked'
    : 'Unchecked';
  dataRow.appendChild(checkElem);
  const radioElem = document.createElement('td');
  const radio1 = registerForm.querySelector('#radio1');
  const radio2 = registerForm.querySelector('#radio2');

  console.log({ radio1, radio2 });
  if (radio1.checked) {
    radioElem.textContent = radio1.value;
  } else if (radio2.checked) {
    radioElem.textContent = radio2.value;
  } else {
    radioElem.textContent = 'Keines';
  }

  dataRow.appendChild(radioElem);
  dataTable.appendChild(dataRow);
}

// "Update details" button opens the <dialog> modally
registerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  favDialog.showModal();
  createTable();
});

openFormButton.addEventListener('click', (event) => {
  registerForm.classList.toggle('hidden');
});

registerButton.addEventListener('click', (event) => {
  errorContainer.innerHTML = '';
  inputs.forEach((input) => {
    if (!input.checkValidity()) {
      const name = input.getAttribute('name');
      const error = input.validationMessage;
      errorContainer.innerHTML += `<div>${name}: ${error}</div>`;
      console.log();
    }
  });
});

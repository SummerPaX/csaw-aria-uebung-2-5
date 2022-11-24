const registerForm = document.getElementById("registerForm");
const favDialog = document.getElementById("favDialog");
const dataTable = document.getElementById("dataTable");
const registerButton = document.getElementById("registerButton");
const openFormButton = document.getElementById("openFormButton");

// If a browser doesn't support the dialog, then hide the
// dialog contents by default.
if (typeof favDialog.showModal !== "function") {	
	favDialog.hidden = true;
}

// Form Submit (wird nur ausgeführt wenn Input valid) öffnet den
// <dialog> als modal und erstellt den neuen Tabelleneintrag
registerForm.addEventListener("submit", (event) => {});

// Toggle Form button toggled die css Klasse hidden auf dem registerForm Element
openFormButton.addEventListener("click", (event) => {
	// Das "aria-pressed" Attribut sollte auf Toggle Buttons gesetzt werden
	openFormButton.setAttribute('aria-pressed', openFormButton.getAttribute('aria-pressed') == 'false')
	registerForm.classList.toggle("hidden");
});

// Beim click Event des submit Button wird Form auf validität geprüft und Error Meldungen aktualisiert
registerButton.addEventListener("click", (event) => {
	updateErrors();
	// preventDefault verhindert das neu laden das Browser Fensters bei Submit
	event.preventDefault();
	// checkValidity gibt einen boolean Wert zurück je nach dem ob alle Felder im Form oder das Feld korrekt ausgefüllt sind
	if (registerForm.checkValidity()) {
		favDialog.showModal();
		createTableEntry();
	}
});

// Die Fehlermeldungen werden aktualisiert
function updateErrors() {
	const errorContainer = document.getElementById("errorContainer");
	errorContainer.innerHTML = "";

	const inputs = registerForm.querySelectorAll("input");
	inputs.forEach((input) => {
		if (input.checkValidity() == false && input.id !== 'radio2') {
			const name = input.getAttribute("name");
			// Das Attribut validationMessage beinhaltet die Html Validation Fehlermeldung
			const error = input.validationMessage;
			errorContainer.innerHTML += `${name}: ${error}\n`;
		}
	});
}

// Ein neuer Eintrag wird in der DataTable erstellt und angehängt
function createTableEntry() {
	const tableRow = document.createElement("tr");
	tableRow.setAttribute('role', 'cell')

	// Es wird für jedes Input Element ein Table Data Element erstellt
	// und dessen inhalt mit dem Value des Inputs gefüllt.
	// Das Table Data Element wird dann jeweils zur Table Row hinzugefügt.

	// Text Inputs
	const firstNameElem = document.createElement("td");
	firstNameElem.textContent = registerForm.querySelector("#inputFirstName").value;
	tableRow.appendChild(firstNameElem);
	const lastNameElem = document.createElement("td");
	lastNameElem.textContent = registerForm.querySelector("#inputLastName").value;
	tableRow.appendChild(lastNameElem);
	const enmailElem = document.createElement("td");
	enmailElem.textContent = registerForm.querySelector("#inputEmail").value;
	tableRow.appendChild(enmailElem);
	const telElem = document.createElement("td");
	telElem.textContent = registerForm.querySelector("#inputTel").value;
	tableRow.appendChild(telElem);

	// Checkbox
	const checkElem = document.createElement("td");

	if (registerForm.querySelector("#inputCheck").checked) {
		checkElem.textContent = "Checked";
	} else {
		checkElem.textContent = "Unchecked";
	}

	tableRow.appendChild(checkElem);

	// Radios
	const radioElem = document.createElement("td");
	const radio1 = registerForm.querySelector("#radio1");
	const radio2 = registerForm.querySelector("#radio2");

	if (radio1.checked) {
		radioElem.textContent = radio1.value;
	} else if (radio2.checked) {
		radioElem.textContent = radio2.value;
	} else {
		radioElem.textContent = "Keines";
	}
	tableRow.appendChild(radioElem);

	// Die Table Row zur DataTable hinzufügen
	dataTable.appendChild(tableRow);
}
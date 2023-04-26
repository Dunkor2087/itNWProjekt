function Person(firstName, lastName, age, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.phoneNumber = phoneNumber;
}

Person.prototype.toString = function() {
  return `${this.firstName} ${this.lastName}, ${this.age} let, tel: ${this.phoneNumber}`;
};

// Funkce pro uložení dat do Local Storage a aktualizaci tabulky
function savePerson() {
  const firstNameInput = document.getElementById('firstName');
  const lastNameInput = document.getElementById('lastName');
  const ageInput = document.getElementById('age');
  const phoneNumberInput = document.getElementById('phoneNumber');

  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const age = ageInput.value;
  const phoneNumber = phoneNumberInput.value;

// Otravné vyskakovací okno když nezadáme všechna data
  if (!firstName || !lastName || !age || !phoneNumber) {
    alert('Prosím, vyplňte všechna pole.');
    return;
  }

  const person = new Person(firstName, lastName, age, phoneNumber);

  // Uložit data do Local Storage
  const people = JSON.parse(localStorage.getItem('people')) || [];
  people.push(person);
  localStorage.setItem('people', JSON.stringify(people));

  // Aktualizovat tabulku
  const tableBody = document.querySelector('#dataTable tbody');

  const row = tableBody.insertRow();
  const firstNameCell = row.insertCell();
  const lastNameCell = row.insertCell();
  const ageCell = row.insertCell();
  const phoneNumberCell = row.insertCell();

  firstNameCell.textContent = person.firstName;
  lastNameCell.textContent = person.lastName;
  ageCell.textContent = person.age;
  phoneNumberCell.textContent = person.phoneNumber;

// Vyčistit buňky 
  firstNameInput.value = '';
  lastNameInput.value = '';
  ageInput.value = '';
  phoneNumberInput.value = '';
}

// Funkce pro načtení dat z Local Storage a aktualizaci tabulky
function loadPeople() {
  const people = JSON.parse(localStorage.getItem('people')) || [];

  const tableBody = document.querySelector('#dataTable tbody');

  for (const person of people) {
    const row = tableBody.insertRow();
    const firstNameCell = row.insertCell();
    const lastNameCell = row.insertCell();
    const ageCell = row.insertCell();
    const phoneCell = row.insertCell();

    firstNameCell.textContent = person.firstName.toString();
    lastNameCell.textContent = person.lastName.toString();
    ageCell.textContent = person.age.toString();
    phoneCell.textContent = person.phoneNumber.toString();
  }
}
loadPeople();

// Save button uložení - vyvolání
const saveButton = document.getElementById('saveButton');
saveButton.addEventListener('click', savePerson);
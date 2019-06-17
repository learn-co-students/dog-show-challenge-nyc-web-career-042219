const DOGS_URL = 'http://localhost:3000/dogs'

document.addEventListener('DOMContentLoaded', () => {
  console.log('loaded');

//------- DOM ELEMENTS
const dogsTable = document.querySelector('#table-body');
const dogForm = document.querySelector('#dog-form')

//------- LOCAL STATE
let dogs = [];


//------- RENDER METHODS
  function renderAllDogs() {
    dogsTable.innerHTML = '';
    dogs.forEach(dog => {
      dogsTable.innerHTML += `
        <tr data-id="${dog.id}">
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button class='button' data-id="${dog.id}">Edit Dog</button></td>
        </tr>
      `
    })
  }

function selectDog() {
  const dogId = parseInt(event.target.dataset.id);
  const selectedDog = dogs.find(dog => {
    return dog.id === dogId
  })
  if (event.target.className === 'button') {
    dogForm.innerHTML = `
    <form id='dog-form' class="padding margin border-round border-grey">
      <input id='edit-name' type="text" name="name" placeholder="dog's name" value="${selectedDog.name}" />
      <input id='edit-breed' type="text" name="breed" placeholder="dog's breed" value="${selectedDog.breed}" />
      <input id='edit-sex' type="text" name="sex" placeholder="dog's sex" value="${selectedDog.sex}" />
      <input data-id="${selectedDog.id}" type="submit" value="Submit" />
    </form>
    `
  }
}

function editDog() {
  let name = dogForm.querySelector('#edit-name').value;
  let breed = dogForm.querySelector('#edit-breed').value;
  let sex = dogForm.querySelector('#edit-sex').value;

  fetch(`${DOGS_URL}/${event.target.children[3].dataset.id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json',
              'Accept': 'application/json'},
    body: JSON.stringify ({
      name: name,
      breed: breed,
      sex: sex
    })
  })
  .then(response => response.json())
  .then(fetchDogs)
}


//------- EVENT LISTENERS
// (select dog to edit)
dogsTable.addEventListener('click', event => {
  selectDog();
})

//(edit dog)
dogForm.addEventListener('submit', event => {
  event.preventDefault();

  editDog();
//reset form:
  dogForm.innerHTML = `
    <form id='dog-form' class="padding margin border-round border-grey">
      <input type="text" name="name" placeholder="dog's name" value="" />
      <input type="text" name="breed" placeholder="dog's breed" value="" />
      <input type="text" name="sex" placeholder="dog's sex" value="" />
      <input type="submit" value="Submit" />
    </form>
    </div>
  `
})


//------- INITIALIZATION

function fetchDogs() {
  fetch(DOGS_URL)
    .then(response => response.json())
    .then(dogData => {
      console.log('initial render:', dogData);
      dogs = dogData;
      renderAllDogs();
    })
  }

fetchDogs();
})

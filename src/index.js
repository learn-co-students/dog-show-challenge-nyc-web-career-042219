/* eslint-disable indent */
const url = 'http://localhost:3000/dogs';
const tbody = document.getElementById('table-body');
const form = document.getElementById('dog-form');

// * Fetch all dogs and return a promise function.
const fetchDogs = () => fetch(url).then(res => res.json()).then(dogs => dogs);

// * Takes a Dog Object and appends it to the table.
const renderDog = (dogObject) => {
    tbody.innerHTML += `
    <tr data-id='${dogObject.id}'>
        <td>${dogObject.name}</td>
        <td>${dogObject.breed}</td>
        <td>${dogObject.sex}</td>
        <td><button>Edit</button></td>
    </tr>
    `;
};

const prefillForm = (dogObject) => {
    form.dataset.id = dogObject.id;
    form.children[0].value = dogObject.name;
    form.children[1].value = dogObject.breed;
    form.children[2].value = dogObject.sex;
};

const rerun = () => {
    const allDogs = fetchDogs();
    tbody.innerHTML = '';
    allDogs.then(arr => arr.forEach(dogObject => renderDog(dogObject)));
};

const makePatch = (dogObject) => {
    fetch(`${url}/${dogObject.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(dogObject),
    }).then(res => res.json()).then(rerun);
};

// * Event Listener for Edit Buttons on the Table Body.
tbody.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const dogId = e.target.parentElement.parentElement.dataset.id;
        const tableCols = document.querySelector(`[data-id='${dogId}']`).children;
        const dogObject = {
            name: tableCols[0].innerText,
            breed: tableCols[1].innerText,
            sex: tableCols[2].innerText,
            id: dogId,
        };
        prefillForm(dogObject);
    }
});

// * Event Listener for form submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const dogObject = {
        name: e.target[0].value,
        breed: e.target[1].value,
        sex: e.target[2].value,
        id: e.target.dataset.id,
    };
    makePatch(dogObject);
});

// * Call the fetchDogs function, then for each Dog Object render it to the page.
const allDogs = fetchDogs();
allDogs.then(arr => arr.forEach(dogObject => renderDog(dogObject)));

const DOGS_URL = 'http://localhost:3000/dogs/';

document.addEventListener('DOMContentLoaded', () => {
    fetchDogs();
    
    const table = document.querySelector('table');
    const form = document.querySelector('form');

    table.addEventListener('click', function(e) {
        if (e.target.className === 'edit') {
            let row = e.target.parentNode.parentNode;

            form.children.namedItem('name').value = row.children[0].innerText;
            form.children.namedItem('breed').value = row.children[1].innerText;
            form.children.namedItem('sex').value = row.children[2].innerText;

            form.dataset.id = e.target.dataset.id;
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        updateDog(e, e.target.dataset.id);

        e.target.reset();
    })
});

function fetchDogs() {
    fetch(DOGS_URL)
    .then(resp => resp.json())
    .then(function(json) {
        const tableBody = document.querySelector('tbody');
        json.forEach(function(dog) {
            tableBody.appendChild(createDog(dog));
        })
    })
}

function createDog(dog) {
    let table = document.createElement('tr');
    table.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button class='edit' data-id='${dog.id}'>Edit Dog</button></td>
    `
    return table;
}

function updateDog(e, id) {
    let name = e.target.children.namedItem('name').value
    let breed = e.target.children.namedItem('breed').value
    let sex = e.target.children.namedItem('sex').value

    fetch(DOGS_URL + id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name,
            breed,
            sex
        })
    })

    //rerender dom
    let dog = document.querySelectorAll(`[data-id='${id}']`)[1].parentNode.parentNode;
    dog.children[0].innerHTML = name;
    dog.children[1].innerHTML = breed;
    dog.children[2].innerHTML = sex;
}


document.addEventListener('DOMContentLoaded', () => {

const DOGS_URL = "http://localhost:3000/dogs"
const tbody = document.querySelector("#table-body")
const editForm = document.querySelector("#dog-form")
//local state
dogs = []


// i want to listen on this event for the edit button so i can target the button
//then when i have the button i want to know WHICH dog that is
//then i want to throw the dog's values on the dog edit form
//then i want to edit that dog's info with a fetch PATCH
//then i want to re-render all the dogs with another fetch GET

tbody.addEventListener('click', function(e) {
  if (e.target.innerText === "Edit"){
    let dogId = parseInt(e.target.dataset.id)
    //give the form a dataset id of the dog by assigning it here where the dogId is in scope
    editForm.dataset.id = dogId
      // need to find the dog object that has that specfic ID
      let foundDog = dogs.find(dog => dog.id === dogId)
      // console.log(foundDog)
      // console.log(editForm)
      editForm[0].value = foundDog.name
      editForm[1].value = foundDog.breed
      editForm[2].value = foundDog.sex
  }
})

editForm.addEventListener('submit', function(e) {
  e.preventDefault()
  let dogId = parseInt(e.target.dataset.id)
    // let foundDog = dogs.find(dog => dog.id === dogId)
    let newName = editForm[0].value
    let newBreed = editForm[1].value
    let newSex = editForm[2].value
    // console.log(newName);
    // debugger
    fetch(`http://localhost:3000/dogs/${dogId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify({
        'name': newName,
        'breed': newBreed,
        'sex': newSex
      })//end of body
    })//end of fetches
    .then(r => r.json())
    .then(editedDog => {
      console.log(editedDog)
      fetchDogs()
    })
    //can add functions into the .then for async bc then it would run in the order i want it to
    // debugger;
    // console.log("will it work?")
})

//fetches
function fetchDogs(){
fetch(DOGS_URL)
  .then(r => r.json())
  .then(dogData => {
    console.log(dogData)
    dogs = dogData
    renderEachDog(dogs)

  })
}

// function patchDogs(){
//   fetch(`DOGS_URL/${dogId}`, {
//     method: "PATCH",
//     headers: {
//       'Content-Type': 'application/json',
//   },
//     body: JSON.stringify({
//       'name': newName,
//       'breed': newBreed,
//       'sex': newSex
//     })//end of body
//   })//end of fetches
//   .then(r => r.json())
//   .then(editedDog => console.log(editedDog))
// }

//render functions
function renderEachDog(){
  tbody.innerHTML = " "
  dogs.forEach(dog => {
    tbody.innerHTML +=`
    <tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-id="${dog.id}">Edit</button></td></tr>
    `
  })
}


fetchDogs()
})//end of DOMContentLoaded

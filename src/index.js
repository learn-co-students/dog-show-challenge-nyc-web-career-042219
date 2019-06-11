document.addEventListener('DOMContentLoaded', () => {
	const dogUrl = "http://localhost:3000/dogs"
	const dogTable = document.querySelector("#table-body")
	const fullDogForm = document.querySelector("#dog-form")
	const dogNameForm = document.querySelector("#name")
	const dogBreedForm = document.querySelector("#breed")
	const dogSexForm = document.querySelector("#sex")
	const dogArray = []

	let currentDog;


	const displayDogs = fetch(dogUrl)
		.then(response => response.json())
		.then(dogs => viewDogs(dogs))

	function viewDogs(dogs){
		dogs.map(dog => {
			dogArray.push(dog)
			dogTable.innerHTML += `
				<tr>
					<td class="name">${dog.name}</td> 
					<td class="breed">${dog.breed}</td> 
					<td class="sex">${dog.sex}</td> 
					<td>
						<button data-action="edit" data-id="${dog.id}">Edit</button>
					</td>
				</tr>
			`
		})
	}

	dogTable.addEventListener("click", function(e){
		if (e.target.dataset.action = 'edit'){
			let newDogArray = dogArray.filter(doggie => doggie.id === parseInt(e.target.dataset.id));
			let dogToEdit = newDogArray[0];
				dogNameForm.value = dogToEdit.name;
				dogBreedForm.value = dogToEdit.breed;
				dogSexForm.value = dogToEdit.sex;
				currentDog = findOneDog(dogArray, dogNameForm.value, dogBreedForm.value, dogSexForm.value)[0]
			}
		})

	fullDogForm.addEventListener("submit", function(e){
		// e.preventDefault()
		// let pup = findOneDog(dogArray, dogNameForm.value, dogBreedForm.value, dogSexForm.value)
		// let puppy = pup[0]
		// console.log(puppy)
		// console.log(puppy.id)
		// console.log(currentDog)
		// let puppy = currentDog[0]
		fetch(`${dogUrl}/${currentDog.id}`, {
			 method: 'PATCH', // or 'PUT'
			  body: JSON.stringify({
			  	name: dogNameForm.value,
			  	breed: dogBreedForm.value,
			  	sex: dogSexForm.value
			  }), // data can be `string` or {object}!
			  headers:{
			    'Content-Type': 'application/json'
			  }
		})
		displayDogs;
	})

	function findOneDog(allDogs, name, breed, sex){
	let oneDog = allDogs.filter(dog => dog.name === name && dog.breed === breed)
	return oneDog;
}
	

})





const backBtn = document.getElementById('backLogin')
const backLogin = () => {
  document.location.replace('/')
}

backBtn.addEventListener('click', backLogin)

const buyButtons = document.querySelectorAll('.buy-btn')

const buyAnimal = async (e) => {
  e.preventDefault()
  let name = prompt("Please enter your animal's name", "Bessy");
  const animalId = e.target.dataset.animalId
  console.log(animalId)
  const respond = await fetch(`api/animals/${animalId}/farms/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'name': name })
  })

  if (respond.status == 200) {
    alert(`Added ${name} to your farm`)
  } else if (respond.status === 400) {
    alert("You don't have enough gold")
  }
}

// // loops over nodeList of buy buttons to add event listener on all
Array.from(buyButtons).forEach(button => {
  button.addEventListener('click', buyAnimal)
})
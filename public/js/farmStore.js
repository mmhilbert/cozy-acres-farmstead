const backBtn = document.getElementById('backLogin')
const backLogin = () => {
  document.location.replace('/')
}

backBtn.addEventListener('click', backLogin)

const buyButtons = document.querySelectorAll('.buy-btn')

const animalPic = () => {
  const buyBtns = document.querySelectorAll('[data-animal-id]')
  let i = 0
  buyBtns.forEach((buyBtn) => {
    buyBtn.classList.add('buy-animal' + i)
    i++
  })
}

const buyAnimal = async (e) => {
  e.preventDefault()
  let name = prompt("Please enter your animal's name", "Bessy");
  const animalId = e.target.dataset.animalId
  const respond = await fetch(`api/animals/${animalId}/farms/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'name': name })
  })

  if (respond.status == 200) {
    console.log('Added an animal')

  }
}

// // loops over nodeList of buy buttons to add event listener on all
Array.from(buyButtons).forEach(button => {
  button.addEventListener('click', buyAnimal)
})

animalPic()
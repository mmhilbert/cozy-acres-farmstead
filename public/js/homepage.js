// feed me functionality
const feedMeButtons = document.querySelectorAll('.feed-me-btn')
const handleFeedAnimal = async (e) => {
    console.log('feed me')
    e.preventDefault()
    
    const animalId = e.target.parentElement.parentElement.dataset.id
    const animal = await fetch(`/api/farmAnimals/${animalId}/feed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(animal)
    // re-render card
    window.reload()
}

// loops over nodeList of feedMeButtons to add event listener on all
Array.from(feedMeButtons).forEach(button => {
    button.addEventListener('click', handleFeedAnimal)
})

// collect product functionality
const collectButtons = document.querySelectorAll('.collect-btn')
function handleCollectProduct(e) {
    e.preventDefault()
    const animalId = e.target.parentElement.parentElement.dataset.id
    // fetch
}

Array.from(collectButtons).forEach(button => {
    button.addEventListener('click', handleCollectProduct)
})

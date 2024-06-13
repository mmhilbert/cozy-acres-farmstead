// feed me functionality
// const feedMeButtons = document.querySelectorAll('.feed-me-btn')
const handleFeedAnimal = async (animalId) => {
    console.log('feed me')
    
    const response = await fetch(`/api/farmAnimals/${animalId}/feed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.status == 200) {
        const current_gold = await response.json()
        console.log(current_gold)

      }
    // re-render card
    
}

// fetch request to unalive an animal

// // loops over nodeList of feedMeButtons to add event listener on all
// Array.from(feedMeButtons).forEach(button => {
//     button.addEventListener('click', handleFeedAnimal)
// })

// // collect product functionality
// const collectButtons = document.querySelectorAll('.collect-btn')
// function handleCollectProduct(e) {
//     e.preventDefault()
//     const animalId = e.target.parentElement.parentElement.dataset.id
//     // fetch
// }

// Array.from(collectButtons).forEach(button => {
//     button.addEventListener('click', handleCollectProduct)
// })

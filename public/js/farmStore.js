const backBtn = document.getElementById('backLogin')
const backLogin = () => {
  document.location.replace('/')
}

backBtn.addEventListener('click', backLogin)

const cowBtn = document.getElementById('buyCow')
const chickenBtn = document.getElementById('buyChicken')
const sheepBtn = document.getElementById('buySheep')
const pigBtn = document.getElementById('buyPig')

const addCow = async () => {
  
  const response = await fetch('/api/users/', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    console.log(response);}
  
  const respond = await fetch(`/2/farms/${farmId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (respond.status == 200) {
      console.log('Added a cow to the farm')

    }
}
cowBtn.addEventListener('click', addCow)

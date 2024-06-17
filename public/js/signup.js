const signupForm = document.querySelector('.signup-form')


function signingUp(event) {
  event.preventDefault()

  const { email: emailInput, password: passwordInput, username: usernameInput } = event.target.elements

  const userInfo = {
      "name": usernameInput.value,
      "email": emailInput.value,
      "password": passwordInput.value
    }
  
  fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInfo)
  })
    .then(response => {
      console.log(response)
      if(response.status === 200) {
        location.href='/'
      } else {
        alert('Error signing up')
      }
    })
    .catch(err => alert('Error signing up'))
}

const backButton = document.getElementById('backLogin')

const backLogin = () => {
  document.location.replace('/')
}

signupForm.addEventListener('submit', signingUp)

backButton.addEventListener('click', backLogin)
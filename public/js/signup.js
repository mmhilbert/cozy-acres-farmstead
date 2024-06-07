const backButton = document.getElementById('backLogin')


const backLogin = () => {

  document.location.replace('/login')
}


backButton.addEventListener('click', backLogin)

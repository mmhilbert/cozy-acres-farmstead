const viewScores = async (e) => {

    const respond = await fetch(`api/users/score`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (respond.status == 200) {
    const response = await respond.json()
    const topScores = document.querySelectorAll('.score')
    let i = 1
    topScores.forEach((topScore) => {
        topScore.innerHTML = `${i}. ${response[i-1].name} ${response[i-1].score}`
        i++
    })
    } else {
        console.log('error')
    }

  }

  const viewAllScores = async (e) => {

    const respond = await fetch(`api/users/scoreall`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (respond.status == 200) {
    const response = await respond.json()
    const totalHunger = 10000000000
    const percentHunger = response/totalHunger*100
    const numberPercent = document.getElementById("numberPercent")
    numberPercent.innerHTML = `
    End World Hunger
    <br>
    ${response}/${totalHunger}
    <br>
    ${percentHunger.toFixed(6)}
    `
    const allScores = document.getElementById("percentScore")
    allScores.style.height = `${percentHunger}%`
    } else {
        console.log('error')
    }
  }

viewScores()
viewAllScores()
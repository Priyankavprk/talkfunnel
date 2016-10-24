function sendRequest () {
  let xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      let data = JSON.parse(xhttp.responseText)
      addCard(data)
    }
  }
  xhttp.open('GET', 'https://metarefresh.talkfunnel.com/2016/schedule/json', true)
  xhttp.send(null)
}

let visiblecards = []
let a = []

function createCard (session) {
  var card = visiblecards[session.sessions[0].title]
  if (!card) {
    card = document.querySelector('.card').cloneNode(true)
    let container = document.querySelector('.container')
    card.removeAttribute('hidden')
    visiblecards[session.sessions[0].title] = card
    container.appendChild(card)
  }
  card.querySelector('.topic').textContent = session.sessions[0].title
  card.querySelector('.time').textContent = session.slot
  if (session.sessions[0].speaker !== '') {
    card.querySelector('.speaker').textContent = 'SPEAKER:  ' + session.sessions[0].speaker
    card.querySelector('.description').removeAttribute('hidden')
    card.querySelector('.icon').removeAttribute('hidden')
    card.querySelector('.icon').setAttribute('name', session.sessions[0].title)
    card.querySelector('.desc').innerHTML = session.sessions[0].description
  }
  a[session.sessions[0].title] = card
}

function addCard (data) {
  for (let i = 0; i < data.schedule[0].slots.length; i++) {
    createCard(data.schedule[0].slots[i])
  }
}

function description (name) {
  let card = a[name]
  card.querySelector('.desc').removeAttribute('hidden')
}

sendRequest()

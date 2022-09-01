const API_URL = 'https://api.bflist.io/bf2/v1/'


async function getServerList() {
  fetch(`${API_URL}/servers/1`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      parseList(data)
    })
}

function parseList(data) {
  let temp = []
  const parsed = data.forEach((server) => {
    if(server.numPlayers > 0) {
      temp.push(server)
    }
  })
  temp.sort(function(a, b) {return b.numPlayers - a.numPlayers})
  renderList(temp)
}

function renderList(data) {
  data.forEach((item) => {
    container.innerHTML += `
    <div class='container'>
    <span class='servername'>${item.name}</span>
    <span class='serverip'>${item.ip}:${item.port}</span>
    <span class='mapname'>${item.mapName}</span>
    <span class='playercount'>${item.numPlayers}/${item.maxPlayers}</span>
    </div>
    `
  })
  const allElement = document.querySelectorAll('.container')
  allElement.forEach((item) => {
    item.addEventListener('click', () =>{
      let ip = item.children[1].innerText
      navigator.clipboard.writeText(ip).then(() => {
        alert('IP and Port are copied to the clipboard')
      })
    })
  })
}


getServerList()

refreshbutton.addEventListener('click', () => {
  container.innerHTML = ""
  getServerList()
})
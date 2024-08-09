const infoUsers = []
let showData = ''

const getData = async () => {
  try {
    const data = await fetch('https://randomuser.me/api/?results=10').then(res => res.json())
    const randomUsers = data.results

    randomUsers.forEach(user => {
      infoUsers.push({
        name: `${user.name.title}. ${user.name.first} ${user.name.last}`,
        gender: user.gender,
        location: `${user.location.city}, ${user.location.country}`,
        email: user.email,
        birthday: new Date(user.dob.date).toLocaleDateString(),
        photo: user.picture.large,
      })
    })

    infoUsers.forEach(user => {
      showData += `<div class="user">
                    <div class="photo">
                      <image class="photo" src="${user.photo}"></image>
                    </div>
                    <h3>${user.name}</h3>
                    <span>${user.gender}</span>
                    <span>${user.location}</span>
                    <span>${user.birthday}</span>
                    <span>${user.email}</span>
      </div>`
    })

    document.getElementById('container').innerHTML = showData

  } catch (error) {
    showData += `<span>${error.error}</span>`
  }
}

const formUsers = document.querySelector(".formUsers");

formUsers.addEventListener("submit", (event) => {
  event.preventDefault();
  infoUsers.length = 0
  showData = ''
  getData()
})


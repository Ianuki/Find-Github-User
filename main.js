const FindButton = document.getElementById("FindButton")
const UserInput = document.getElementById("UserInput")
const Form = document.getElementById("GetUserForm")

Form.addEventListener("submit", function(e){
    e.preventDefault()

    fetch(`https://api.github.com/users/${UserInput.value}`)
    .then((result) => result.json())
    .then((data) => {
        let Container = document.createElement("div")

        document.body.appendChild(Container)

        Container.innerHTML = `<img src="${data.avatar_url}"> <br> Name: ${data.name} <br> Bio: ${data.bio} <br> ID: ${data.id}`
    })
})
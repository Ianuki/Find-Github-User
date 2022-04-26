var FindButton = document.getElementById("FindButton")
var UserInput = document.getElementById("UserInput")
var Form = document.getElementById("GetUserForm")

const URL = "https://api.github.com/users/"

Form.addEventListener("submit", function(e){
    e.preventDefault()
    
    if (UserInput.value == "") {
        if (document.getElementById("Container") != null) {
            document.body.removeChild(document.getElementById("Container"))
        }
        if (document.getElementById("Error") != null) {
            Form.removeChild(document.getElementById("Error"))
        }

        return 0;
    }

    let Http = new XMLHttpRequest

    Http.onreadystatechange = (e) => {
            if (Http.readyState == 4) {
                if (Http.status == 200) {
                    if (document.getElementById("Container") != null) {
                        document.body.removeChild(document.getElementById("Container"))
                    }
                    if (document.getElementById("Error") != null) {
                        Form.removeChild(document.getElementById("Error"))
                    } 

                    let UserData = JSON.parse(Http.response)
                    let DataToShow = {
                        "Profile: " : `<a href="https://github.com/${UserData.login}"> ${UserData.login} </a>`,
                        "Name: " : UserData.name,
                        "Repos: " : UserData.public_repos,
                        "Id: " :  UserData.id
                    }

                    if (UserData.name == null) {
                        delete(DataToShow["Name: "])
                    }

                    let Container = document.createElement("div")
                    Container.id = "Container"
                    
                    let TxtContainer = document.createElement("div")
                    TxtContainer.id = "TxtContainer"

                    for (D in DataToShow) {
                        TxtContainer.innerHTML += D + DataToShow[D] + "<br><br>"
                    }

                    Container.innerHTML += `<img src="${UserData.avatar_url}">`

                    document.body.appendChild(Container)
                    Container.appendChild(TxtContainer)
                }
                else {
                    if (document.getElementById("Error") != null) {
                        Form.removeChild(document.getElementById("Error"))
                    }
                    if (document.getElementById("Container") != null) {
                        document.body.removeChild(document.getElementById("Container"))
                    } 

                    let Error = document.createElement("span")
                    Error.id = "Error"
                    Error.innerHTML = "<br> Can't find user. Try using a valid username"
                    Form.appendChild(Error)

                    return 0
                }
            }
        }

    Http.open("GET", URL + UserInput.value);
    Http.send();    
})

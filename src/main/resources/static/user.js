fetch("/get_user").then(res => res.json())
    .then(json => {
        document.getElementById('currentUserEmail').textContent = json["email"]
        const userRoles = json["roles"].map(role => role.name).join(' ')
        document.getElementById('currentUserRoles').textContent = userRoles
        const tr = document.createElement("tr")
        const id = document.createElement("td")
        id.textContent = json["id"]
        const firstName = document.createElement("td")
        firstName.textContent = json["name"]
        const lastName = document.createElement("td")
        lastName.textContent = json["lastName"]
        const age = document.createElement("td")
        age.textContent = json["age"]
        const email = document.createElement("td")
        email.textContent = json["email"]
        const roles = document.createElement("td")
        roles.textContent = userRoles;
        tr.appendChild(id)
        tr.appendChild(firstName)
        tr.appendChild(lastName)
        tr.appendChild(age)
        tr.appendChild(email)
        tr.appendChild(roles)
        document.querySelector("tbody").appendChild(tr)
    })
fetch("/get_user").then(res => res.json())
    .then(json => {
        document.getElementById('currentUserEmail').textContent = json["email"]
        const userRoles = json["roles"];
        const roleNames = userRoles.map(role => role.name)
        document.getElementById('currentUserRoles').textContent = roleNames.join(' ')
    })

fetch("/roles")
    .then(res => res.json())
    .then(json => {
        const newRoles = document.getElementById('roles')
        const editRoles = document.getElementById('eroles')
        const deleteRoles = document.getElementById('droles')
        json.forEach(role => {
            const optionNew = document.createElement('option')
            optionNew.value = role["id"]
            optionNew.text = role["name"]
            newRoles.appendChild(optionNew)
            const optionEdit = document.createElement('option')
            optionEdit.value = role["id"]
            optionEdit.text = role["name"]
            editRoles.appendChild(optionEdit)
            const optionDelete = document.createElement('option')
            optionDelete.value = role["id"]
            optionDelete.text = role["name"]
            deleteRoles.appendChild(optionDelete)
        })
    })

fetch("/users")
    .then(res => res.json()).then(json => {
    json.forEach(addTableUser)
})

function deleteUser(user) {
    document.getElementById("did").value = user["id"]
    document.getElementById("dname").value = user["name"]
    document.getElementById("dlastName").value = user["lastName"]
    document.getElementById("dage").value = user["age"]
    document.getElementById("demail").value = user["email"]
    document.getElementById(`deleteButton`).onclick = function () {
        fetch(`/delete/${user["id"]}`, {
            method: "DELETE"
        }).then(response => {
            document.getElementById(`user${user["id"]}`).remove()
        });
    }
}

function editUser(user) {
    document.getElementById("eid").value = user["id"]
    document.getElementById("ename").value = user["name"]
    document.getElementById("elastName").value = user["lastName"]
    document.getElementById("eage").value = user["age"]
    document.getElementById("eemail").value = user["email"]
    const roles = []
    const options = document.getElementById("eroles").options

    document.getElementById(`editButton`).onclick = function () {
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                roles.push({
                    id: options[i].value,
                    name: options[i].text
                })
            }
        }
        fetch(`/edit/${user["id"]}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                id: document.getElementById("eid").value,
                name: document.getElementById("ename").value,
                lastName: document.getElementById("elastName").value,
                age: document.getElementById("eage").value,
                email: document.getElementById("eemail").value,
                password: document.getElementById("epassword").value,
                roles: name
            })
        }).then(r => r.json())
            .then(json => {
                document.getElementById(`user${user["id"]}`).remove()

            })
    }
}

function createNewUser() {
    const name = document.getElementById('name').value
    const lastName = document.getElementById('lastName').value
    const age = document.getElementById('age').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    let newRoles = []
    const options = document.getElementById('roles').options
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            newRoles.push({
                id: options[i].value,
                name: options[i].text
            })
        }
    }
    fetch('/new', {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({name, lastName, age, email, password, roles: newRoles})
    }).then(r => r.json())
        .then(json => {
                addTableUser({id: json, name, lastName, age, email, password, roles: newRoles})
                document.getElementById('tabTable').click()
                document.getElementById('name').value = ""
                document.getElementById('lastName').value = ""
                document.getElementById('age').value = ""
                document.getElementById('email').value = ""
                document.getElementById('password').value = ""
                for (let i = 0; i < options.length; i++) {
                    if (options[i].selected) {
                        options[i].selected = false
                    }
                }
            }
        )
}

function addTableUser(user) {
    const tableBody = document.querySelector("tbody")
    let rolesArray = []
    for (let i = 0; i < user["roles"].length; i++) {
        rolesArray.push(user["roles"][i]["name"])
    }
    const tr = document.createElement("tr")
    const id = document.createElement("td")
    id.textContent = user["id"]
    const firstName = document.createElement("td")
    firstName.textContent = user["name"]
    const lastName = document.createElement("td")
    lastName.textContent = user["lastName"]
    const age = document.createElement("td")
    age.textContent = user["age"]
    const email = document.createElement("td")
    email.textContent = user["email"]
    const roles = document.createElement("td")
    roles.textContent = rolesArray.join(" ")
    const editTd = document.createElement("td")
    const editButton = document.createElement("button")
    editButton.setAttribute("type", "button")
    editButton.setAttribute("class", "btn btn-info")
    editButton.setAttribute("name", "edit")
    editButton.setAttribute("id", `editUser${user["id"]}`)
    editButton.setAttribute("data-toggle", "modal")
    editButton.setAttribute("data-target", "#editModal")
    editButton.textContent = "Edit"
    editButton.onclick = function () {
        editUser(user)
    }
    editTd.appendChild(editButton)
    const removeTd = document.createElement("td")
    const removeButton = document.createElement("button")
    removeButton.setAttribute('type', "button")
    removeButton.setAttribute('class', "btn btn-danger")
    removeButton.setAttribute('id', `deleteUser${user["id"]}`)
    removeButton.setAttribute('data-target', "#deleteModal")
    removeButton.setAttribute('data-toggle', "modal")
    removeButton.textContent = "Delete"
    removeButton.onclick = function () {
        deleteUser(user)
    }
    removeTd.appendChild(removeButton)
    tr.appendChild(id)
    tr.appendChild(firstName)
    tr.appendChild(lastName)
    tr.appendChild(age)
    tr.appendChild(email)
    tr.appendChild(roles)
    tr.appendChild(editTd)
    tr.appendChild(removeTd)
    tableBody.appendChild(tr)
}
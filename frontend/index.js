"use strict";

async function displayUsers() {
    try {
        const users = await loadUsers(usersUrl);
        usersToHTML(users.map(User.generateUser));
    } catch (error) {
        console.error("No se pudieron cargar los usuarios:", error);
    }
}

let ximenaUser = new User("Ximena", "Ruis", "ximena.ruiz@iteso.mx", "BestPassword2", "1997-08-08", "M");

function addUser(user) {
    storeUser(usersUrl, user, (msg) => {
        console.log(msg);
        displayUsers();
    }, (err) => console.error(err));
}

displayUsers();
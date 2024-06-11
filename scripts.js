document.addEventListener("DOMContentLoaded", () => {
    const userForm = document.getElementById("userForm");
    const userTableBody = document.querySelector("#userTable tbody");

    function loadUsers() {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.forEach(user => addUserToTable(user));
    }

    function addUserToTable(user) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
        `;
        userTableBody.appendChild(row);
    }

    function saveUser(user) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
    }

    userForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const firstName = event.target.firstName.value.trim();
        const lastName = event.target.lastName.value.trim();
        const age = parseInt(event.target.age.value.trim(), 10);

        if (firstName === "" || lastName === "" || isNaN(age)) {
            alert("Please fill out all fields correctly.");
        } else {
            if (age < 18) {
                alert("Age must be 18 or older.");
            } else {
                const user = { firstName, lastName, age };
                addUserToTable(user);
                saveUser(user);
                userForm.reset();
            }
        }
    });

    loadUsers();
});

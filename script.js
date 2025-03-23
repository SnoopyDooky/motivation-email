document.getElementById("signup-button").addEventListener("click", async function () {
    let email = document.getElementById("email").value;
    let message = document.getElementById("message");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        message.textContent = "Please enter a valid email!";
        message.style.color = "red";
        return;
    }

    try {
        let response = await fetch("http://127.0.0.1:8000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email })
        });

        let result = await response.json();
        console.log(result.response);


        if (response.ok) {
            message.textContent = "Thank you for signing up!";
            message.style.color = "green";
            document.getElementById("email").value = ""; // Clear the input field
        } else {
            message.textContent = result.message || "Something went wrong!";
            message.style.color = "red";
        }
    } catch (error) {
        message.textContent = "Error connecting to server!";
        message.style.color = "red";
    }
});

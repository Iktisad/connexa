document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex for basic validation

    // Real-time validation for the email field
    emailInput.addEventListener("input", function () {
        const emailError = document.getElementById("emailError");
        if (!this.value) {
            emailError.textContent = "Email is required.";
        } else if (!emailRegex.test(this.value)) {
            emailError.textContent = "Please enter a valid email address.";
        } else {
            emailError.textContent = ""; // Clear the error message
        }
    });

    // Real-time validation for the password field
    passwordInput.addEventListener("input", function () {
        const passwordError = document.getElementById("passwordError");
        if (!this.value) {
            passwordError.textContent = "Password is required.";
        } else {
            passwordError.textContent = ""; // Clear the error message
        }
    });

    // Final validation before form submission
    const loginForm = document.querySelector("form");
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from submitting immediately

        // Trigger validation events
        emailInput.dispatchEvent(new Event("input"));
        passwordInput.dispatchEvent(new Event("input"));

        // Check for any validation errors
        if (
            !document.getElementById("emailError").textContent &&
            !document.getElementById("passwordError").textContent
        ) {
            console.log("Form is valid. Submitting...");
            // loginForm.submit(); // Uncomment to actually submit the form
            // Construct user object from form data
            const user = {
                email: emailInput.value,
                password: passwordInput.value,
            };

            // Send user data to the backend for login
            fetch("http://localhost:3000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to login");
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("Login successful:", data);
                    // Store JWT token in browser's local storage
                    localStorage.setItem("token", data.token);
                    // Redirect to the home page (contacts.html)
                    window.location.href = "../contact/index.html";
                })
                .catch((error) => {
                    console.error("Error logging in:", error.message);
                    alert(
                        "Failed to login. Please check your credentials and try again."
                    ); // Alert user about the error
                });
        }
    });
});

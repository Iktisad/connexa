import validator, { deleteEmptyFields } from "./validation.js";
// import { jwtDecode } from "../../../node_modules/jwt-decode/build/cjs/index.js";

document.addEventListener("DOMContentLoaded", () => {
    // Retrieve JWT token from local storage
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Not Authorized to View!");
        return (window.location.href = "../auth/login.html");
    }

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const website = document.getElementById("website");
    const addressUnitNumber = document.getElementById("addressUnitNumber");
    const addressCivicNumber = document.getElementById("addressCivicNumber");
    const addressPostalCode = document.getElementById("addressPostalCode");

    // Applying validation
    validator.validateNonEmpty(
        firstName,
        document.getElementById("firstNameError"),
        "First name is required."
    );
    validator.validateNonEmpty(
        lastName,
        document.getElementById("lastNameError"),
        "Last name is required."
    );
    validator.validateRegex(
        email,
        document.getElementById("emailError"),
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address."
    );
    validator.validateRegex(
        website,
        document.getElementById("websiteError"),
        /^https?:\/\/.*/,
        "Please enter a valid URL with http:// or https://."
    );
    validator.validatePhone(phone, document.getElementById("phoneError")); // Apply real-time phone formatting and validation
    validator.validateMustBeANumber(
        addressUnitNumber,
        document.getElementById("addressUnitNumberError"),
        "Enter a valid number"
    );
    validator.validateMustBeANumber(
        addressCivicNumber,
        document.getElementById("addressCivicNumberError"),
        "Enter a valid number"
    );
    validator.validatePostalCode(
        addressPostalCode,
        document.getElementById("addressPostalCodeError"),
        "Please enter a valid postal code."
    );

    const form = document.getElementById("contactForm");
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission for demonstration

        // Check for errors
        const errorMessages = document.querySelectorAll(".text-red-500");
        const errors = Array.from(errorMessages).find(
            (message) => message.textContent !== ""
        );

        if (!errors) {
            console.log("Form is valid. Proceed with form submission...");
            // Here you would handle the form submission, e.g., sending data to a server

            // Construct contact object from form data

            const contact = {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                phone:
                    "+" +
                    document.getElementById("countryCode").value +
                    " " +
                    phone.value,
                website: website.value || "",
                address: {
                    city: document.getElementById("addressCity").value || "",
                    street:
                        document.getElementById("addressStreet").value || "",
                    unitNumber: addressUnitNumber.value || "",
                    civicNumber: addressCivicNumber.value || "",
                    province:
                        document.getElementById("addressProvince").value || "",
                    postalCode:
                        document.getElementById("addressPostalCode").value ||
                        "",
                },
            };
            // Send contact data to the backend for adding
            fetch("http://localhost:3000/api/contacts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Include JWT token in the request headers
                },
                body: JSON.stringify(deleteEmptyFields(contact)),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to add contact");
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("Contact added successfully:", data);
                    alert("Contact added successfully");
                    window.location.href = "./index.html"; // Redirect to the login page
                })
                .catch((error) => {
                    console.error("Error adding contact:", error.message);
                    alert(error.message);
                    // Optionally, you can show an error message to the user here
                });
        }
    });
});

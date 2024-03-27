import validator, { deleteEmptyFields } from "./validation.js";
document.addEventListener("DOMContentLoaded", () => {
    const editContactForm = document.getElementById("editContactForm");

    // Retrieving the stored contact data
    const contactToEdit = JSON.parse(localStorage.getItem("contactToEdit"));

    if (contactToEdit) {
        // Populate the form fields with the contact's data
        document.getElementById("firstName").value = contactToEdit.firstName;
        document.getElementById("lastName").value = contactToEdit.lastName;
        document.getElementById("company").value = contactToEdit.company || "";
        document.getElementById("email").value = contactToEdit.email;
        document.getElementById("website").value = contactToEdit.website || "";
        document.getElementById("addressUnitNumber").value =
            contactToEdit.address.unitNumber;
        document.getElementById("addressCivicNumber").value =
            contactToEdit.address.civicNumber;
        document.getElementById("addressCity").value =
            contactToEdit.address.city;
        document.getElementById("addressStreet").value =
            contactToEdit.address.street;
        document.getElementById("addressProvince").value =
            contactToEdit.address.province;
        document.getElementById("addressPostalCode").value =
            contactToEdit.address.postalCode;

        //phone requires reformatting and stripping off country code and setting it in select box

        // Assuming 'contactToEdit.phone' is in the format "+<countryCode> <restOfNumber>"
        // Example: "+1 234567890"

        const fullPhoneNumber = contactToEdit.phone;
        const countryCodeRegex = /^(\+\d+)\s/; // Regex to match country code at the start
        const match = fullPhoneNumber.match(countryCodeRegex);

        if (match) {
            let countryCode = match[1]; // Extracted country code, e.g., "+1"
            const restOfNumber = fullPhoneNumber.replace(countryCodeRegex, ""); // The rest of the phone number without the country code

            // Set the rest of the phone number
            document.getElementById("phone").value = restOfNumber;
            countryCode = countryCode.replace("+", "");
            // Set the corresponding country code in the select box
            const countryCodeSelect = document.getElementById("countryCode");
            for (let i = 0; i < countryCodeSelect.options.length; i++) {
                if (countryCodeSelect.options[i].value === countryCode) {
                    countryCodeSelect.selectedIndex = i;
                    break;
                }
            }
        } else {
            // In case the phone number does not match the expected format, handle accordingly
            // For example, set some default values or leave the fields blank
            console.error("Phone number does not match the expected format");
        }
    }
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const website = document.getElementById("website");
    const addressUnitNumber = document.getElementById("addressUnitNumber");
    const addressCivicNumber = document.getElementById("addressCivicNumber");
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

    editContactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log(contactToEdit);
        // Collect updated data from form fields
        const updatedContact = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            company: document.getElementById("company").value,
            phone:
                "+" +
                document.getElementById("countryCode").value +
                " " +
                document.getElementById("phone").value,

            email: document.getElementById("email").value,
            website: document.getElementById("website").value,
            address: {
                unitNumber: document.getElementById("addressUnitNumber").value,
                civicNumber:
                    document.getElementById("addressCivicNumber").value,
                city: document.getElementById("addressCity").value,
                street: document.getElementById("addressStreet").value,
                province: document.getElementById("addressProvince").value,
                postalCode: document.getElementById("addressPostalCode").value,
            },
            // Collect other fields similarly
        };

        const reshape = deleteEmptyFields(updatedContact);
        const token = localStorage.getItem("token");
        // Send the updated contact data to the backend
        fetch(`http://localhost:3000/api/contacts/${contactToEdit._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Include JWT token in the request headers
            },
            body: JSON.stringify(reshape),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update contact");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Contact updated successfully:", data);
                // Clear the stored data to prevent it from affecting other edit operations
                localStorage.removeItem("contactToEdit");
                alert("Contact updated successfully");
                window.location.href = "./index.html"; // Redirect to the contacts list page
            })
            .catch((error) => {
                console.error("Error updating contact:", error.message);
                alert(error.message);
                // Optionally, show an error message to the user
            });

        // Redirect back to the contacts list page or show a success message
        // window.location.href = '/path/to/contacts-list.html';
    });
});

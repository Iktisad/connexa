import validator from "./validation.js";
document.addEventListener('DOMContentLoaded', () => {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const website = document.getElementById('website');
    const addressUnitNumber = document.getElementById('addressUnitNumber');
    const addressCivicNumber = document.getElementById('addressCivicNumber');

    
    // Applying validation
    validator.validateNonEmpty(firstName, document.getElementById('firstNameError'), 'First name is required.');
    validator.validateNonEmpty(lastName, document.getElementById('lastNameError'), 'Last name is required.');
    validator.validateRegex(email, document.getElementById('emailError'), /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address.');
    validator.validateRegex(website, document.getElementById('websiteError'), /^https?:\/\/.*/, 'Please enter a valid URL with http:// or https://.');
    validator.validatePhone(phone, document.getElementById('phoneError')); // Apply real-time phone formatting and validation
    validator.validateMustBeANumber(addressUnitNumber, document.getElementById('addressUnitNumberError'), 'Enter a valid number')
    validator.validateMustBeANumber(addressCivicNumber, document.getElementById('addressCivicNumberError'), 'Enter a valid number')
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form submission for demonstration

        // Check for errors
        const errorMessages = document.querySelectorAll('.text-red-500');
        const errors = Array.from(errorMessages).find(message => message.textContent !== '');

        if (!errors) {
            console.log('Form is valid. Proceed with form submission...');
            // Here you would handle the form submission, e.g., sending data to a server
        }
    });
});

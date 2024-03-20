document.addEventListener('DOMContentLoaded', () => {
   
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const website = document.getElementById('website');

    
    // Validation functions
    const validateNonEmpty = (inputField, errorMessageField, message) => {
        inputField.addEventListener('input', () => {
            errorMessageField.textContent = inputField.value.trim() ? '' : message;
        });
    };

    const validateRegex = (inputField, errorMessageField, regex, message) => {
        inputField.addEventListener('input', () => {
            errorMessageField.textContent = regex.test(inputField.value.trim()) ? '' : message;
        });
    };


    // Applying validation
    validateNonEmpty(firstName, document.getElementById('firstNameError'), 'First name is required.');
    validateNonEmpty(lastName, document.getElementById('lastNameError'), 'Last name is required.');

    validateRegex(email, document.getElementById('emailError'), /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address.');
    validateRegex(website, document.getElementById('websiteError'), /^https?:\/\/.*/, 'Please enter a valid URL with http:// or https://.');
    validateRegex(phone, document.getElementById('phoneError'), /^\+1 \(\d{3}\) \d{3}-\d{4}$/, 'Please enter a valid phone number in the format +1 (xxx) xxx-xxxx.');
    // validatePhone(phone, document.getElementById('phoneError'), "Please enter a valid phone number with 10 digits or 11 digits starting with 1.")
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form submission for demonstration

        // Check for errors
        const errorMessages = document.querySelectorAll('.text-red-500');
        const errors = Array.from(errorMessages).find(message => message.textContent !== '');

        if (!errors) {
            console.log('Form is valid. Proceed with form submission...');
            // Perform form submission, like sending data to a server
            // form.submit();
        }
    });
});

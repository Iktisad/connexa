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

    // Updated phone validation to format as (xxx) xxx-xxxx
    const validatePhone = (inputField, errorMessageField) => {
        inputField.addEventListener('input', () => {
            let inputNumbers = inputField.value.replace(/\D/g, ''); // Strip all non-digits
            let formattedNumber = '';

            if (inputNumbers.length > 3 && inputNumbers.length <= 6) {
                formattedNumber = `(${inputNumbers.slice(0, 3)}) ${inputNumbers.slice(3)}`;
            } else if (inputNumbers.length > 6) {
                formattedNumber = `(${inputNumbers.slice(0, 3)}) ${inputNumbers.slice(3, 6)}-${inputNumbers.slice(6, 10)}`;
            } else {
                formattedNumber = inputNumbers;
            }

            inputField.value = formattedNumber; // Update the input with the formatted number
        });

        inputField.addEventListener('blur', () => {
            const digitsOnly = inputField.value.replace(/\D/g, '');
            errorMessageField.textContent = digitsOnly.length === 10 ? '' : 'Please enter a 10-digit phone number.';
        });
    };

    // Applying validation
    validateNonEmpty(firstName, document.getElementById('firstNameError'), 'First name is required.');
    validateNonEmpty(lastName, document.getElementById('lastNameError'), 'Last name is required.');
    validateRegex(email, document.getElementById('emailError'), /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address.');
    validateRegex(website, document.getElementById('websiteError'), /^https?:\/\/.*/, 'Please enter a valid URL with http:// or https://.');
    validatePhone(phone, document.getElementById('phoneError')); // Apply real-time phone formatting and validation

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

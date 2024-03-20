document.addEventListener('DOMContentLoaded', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex for basic validation

    const validateInput = (input, message) => {
        const errorElement = document.getElementById(`${input.id}Error`);
        if (!input.value.trim()) {
            errorElement.textContent = `${message} cannot be empty.`;
            return false;
        } else {
            errorElement.textContent = '';
            return true;
        }
    };

    const validateEmail = (input) => {
        const errorElement = document.getElementById(`${input.id}Error`);
        if (!emailRegex.test(input.value.trim())) {
            errorElement.textContent = 'Please enter a valid email address.';
            return false;
        } else {
            errorElement.textContent = '';
            return true;
        }
    };

    const validatePasswordsMatch = () => {
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        const errorElement = document.getElementById('confirmPasswordError');
        if (password.value !== confirmPassword.value) {
            errorElement.textContent = 'Passwords do not match.';
            return false;
        } else {
            errorElement.textContent = '';
            return true;
        }
    };

    document.getElementById('name').addEventListener('input', (e) => validateInput(e.target, 'Name'));
    document.getElementById('email').addEventListener('input', (e) => validateEmail(e.target));
    document.getElementById('password').addEventListener('input', () => validatePasswordsMatch());
    document.getElementById('confirmPassword').addEventListener('input', () => validatePasswordsMatch());

    const signUpForm = document.querySelector('form');
    signUpForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Perform final validation before submitting
        const isNameValid = validateInput(document.getElementById('name'), 'Name');
        const isEmailValid = validateEmail(document.getElementById('email'));
        const isPasswordMatch = validatePasswordsMatch();

        if (isNameValid && isEmailValid && isPasswordMatch) {
            // Form is valid, proceed with submission
            console.log('Form data is valid. Proceed with form submission.');
            // signUpForm.submit(); // Uncomment to proceed with the actual submission
        }
    });
});

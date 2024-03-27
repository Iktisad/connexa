export default {
    // Validation functions
    validateNonEmpty: (inputField, errorMessageField, message) => {
        inputField.addEventListener("input", () => {
            errorMessageField.textContent = inputField.value.trim()
                ? ""
                : message;
        });
    },

    validateRegex: (inputField, errorMessageField, regex, message) => {
        inputField.addEventListener("input", () => {
            errorMessageField.textContent =
                regex.test(inputField.value.trim()) || inputField.value === ""
                    ? ""
                    : message;
        });
    },
    validateMustBeANumber: (inputField, errorMessageField, message) => {
        inputField.addEventListener("input", () => {
            // Check if the input value is a number
            const isNumber = !isNaN(inputField.value);
            errorMessageField.textContent = !isNumber ? message : "";
        });
    },
    // Updated phone validation to format as (xxx) xxx-xxxx
    validatePhone: (inputField, errorMessageField) => {
        inputField.addEventListener("input", () => {
            let inputNumbers = inputField.value.replace(/\D/g, ""); // Strip all non-digits
            let formattedNumber = "";

            if (inputNumbers.length > 3 && inputNumbers.length <= 6) {
                formattedNumber = `(${inputNumbers.slice(
                    0,
                    3
                )}) ${inputNumbers.slice(3)}`;
            } else if (inputNumbers.length > 6) {
                formattedNumber = `(${inputNumbers.slice(
                    0,
                    3
                )}) ${inputNumbers.slice(3, 6)}-${inputNumbers.slice(6, 10)}`;
            } else {
                formattedNumber = inputNumbers;
            }

            inputField.value = formattedNumber; // Update the input with the formatted number
        });

        inputField.addEventListener("blur", () => {
            const digitsOnly = inputField.value.replace(/\D/g, "");
            errorMessageField.textContent =
                digitsOnly.length === 10
                    ? ""
                    : "Please enter a 10-digit phone number.";
        });
    },
    validatePostalCode: (inputField, errorMessageField, message) => {
        inputField.addEventListener("input", () => {
            const trimmedValue = inputField.value.trim();
            const isValid = /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/.test(
                trimmedValue
            );
            let formattedValue = "";

            if (isValid) {
                // Remove any spaces and convert to uppercase
                const normalizedValue = trimmedValue
                    .replace(/\s/g, "")
                    .toUpperCase();
                // Format as "A1A 1A1"
                formattedValue = `${normalizedValue.slice(
                    0,
                    3
                )} ${normalizedValue.slice(3)}`;
            }

            errorMessageField.textContent =
                isValid || trimmedValue === "" ? "" : message;
            inputField.value = formattedValue || trimmedValue;
        });
    },
};

export const deleteEmptyFields = (obj) => {
    for (const key in obj) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
            deleteEmptyFields(obj[key]); // Recursively call the function for nested objects
            if (Object.keys(obj[key]).length === 0) {
                delete obj[key]; // Delete the field if the nested object becomes empty
            }
        } else if (!obj[key]) {
            delete obj[key]; // Delete the field if it doesn't have a value
        }
    }
    return obj;
};

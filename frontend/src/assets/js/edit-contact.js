document.addEventListener('DOMContentLoaded', () => {
    const editContactForm = document.getElementById('editContactForm');

    // Retrieving the stored contact data
    const contactToEdit = JSON.parse(localStorage.getItem('contactToEdit'));

    if (contactToEdit) {
        // Populate the form fields with the contact's data
        document.getElementById('firstName').value = contactToEdit.firstName;
        document.getElementById('lastName').value = contactToEdit.lastName;
        document.getElementById('company').value = contactToEdit.company;
        document.getElementById('phone').value = contactToEdit.phone;
        document.getElementById('email').value = contactToEdit.email;
        document.getElementById('website').value = contactToEdit.website;
        document.getElementById('address_unit_number').value = contactToEdit.address.unitNumber;
        document.getElementById('address_civic_number').value = contactToEdit.address.civicNumber;
        document.getElementById('address_city').value = contactToEdit.address.city;
        document.getElementById('address_street').value = contactToEdit.address.street;
        document.getElementById('address_province').value = contactToEdit.address.province;
        document.getElementById('address_postal_code').value = contactToEdit.address.postalCode;
        // Populate other fields similarly
    }

    editContactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Collect updated data from form fields
        const updatedContact = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            company:document.getElementById('company').value,
            phone:document.getElementById('phone').value,
            email:document.getElementById('email').value,
            website:document.getElementById('website').value,
            address:{
                unitNumber:document.getElementById('address_unit_number').value,
                civicNumber: document.getElementById('address_civic_number').value,
                city: document.getElementById('address_city').value,
                street: document.getElementById('address_street').value,
                province: document.getElementById('address_province').value,
                postalCode:document.getElementById('address_postal_code').value
            }
            // Collect other fields similarly
        };

        // Update the contact in your local contacts list
        // (This part depends on how you're storing and managing contacts on the client side)

        // Clear the stored data to prevent it from affecting other edit operations
        localStorage.removeItem('contactToEdit');

        // Redirect back to the contacts list page or show a success message
        window.location.href = '/path/to/contacts-list.html';
    });
});

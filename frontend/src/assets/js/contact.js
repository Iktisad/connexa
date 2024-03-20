document.addEventListener('DOMContentLoaded', () => {
    let contacts = [
        { id: "contact001", firstName: "John", lastName: "Doe", company: "Acme Corp", phone: "+1 (123) 456-7890", email: "john.doe@example.com", website: "https://example.com", address: { unitNumber: "12", civicNumber: "345", street: "Elm Street", city: "Springfield", province: "SP", postalCode: "A1B 2C3" } },
        { id: "contact002", firstName: "Jane", lastName: "Smith", company: "Globex Corporation", phone: "+1 (234) 567-8901", email: "jane.smith@example.com", website: "https://example.org", address: { unitNumber: "7", civicNumber: "890", street: "Pine Street", city: "Shelbyville", province: "SH", postalCode: "D4E 5F6" } },
        { id: "contact003", firstName: "Alice", lastName: "Johnson", company: "Soylent Corp", phone: "+1 (345) 678-9012", email: "alice.johnson@example.com", website: "https://example.net", address: { unitNumber: "22", civicNumber: "123", street: "Oak Street", city: "Capital City", province: "CC", postalCode: "G7H 8I9" } },
        { id: "contact004", firstName: "Bob", lastName: "Brown", company: "Initech", phone: "+1 (456) 789-0123", email: "bob.brown@example.com", website: "https://initech.com", address: { unitNumber: "5A", civicNumber: "456", street: "Maple Street", city: "North Haverbrook", province: "NH", postalCode: "J1K 2L3" } },
        { id: "contact005", firstName: "Charlie", lastName: "Davis", company: "Umbrella Corporation", phone: "+1 (567) 890-1234", email: "charlie.davis@example.com", website: "https://umbrellacorp.com", address: { unitNumber: "8B", civicNumber: "789", street: "Chestnut Street", city: "Ogdenville", province: "OG", postalCode: "M4N 5O6" } },
        { id: "contact006", firstName: "Diana", lastName: "Evans", company: "Hooli", phone: "+1 (678) 901-2345", email: "diana.evans@example.com", website: "https://hooli.com", address: { unitNumber: "3C", civicNumber: "101", street: "Birch Street", city: "Brockway", province: "BR", postalCode: "P7Q 8R9" } },
        { id: "contact007", firstName: "Edward", lastName: "Wilson", company: "Vehement Capital Partners", phone: "+1 (789) 012-3456", email: "edward.wilson@example.com", website: "https://vehementcapital.com", address: { unitNumber: "9D", civicNumber: "212", street: "Willow Street", city: "Cypress Creek", province: "CY", postalCode: "S8T 9U0" } },
        { id: "contact008", firstName: "Fiona", lastName: "King", company: "Massive Dynamic", phone: "+1 (890) 123-4567", email: "fiona.king@example.com", website: "https://massivedynamic.com", address: { unitNumber: "6F", civicNumber: "323", street: "Peachtree Street", city: "Sprocketville", province: "SP", postalCode: "V1W 2X3" } },
        { id: "contact009", firstName: "George", lastName: "Miller", company: "Stark Industries", phone: "+1 (901) 234-5678", email: "george.miller@example.com", website: "https://starkindustries.com", address: { unitNumber: "10G", civicNumber: "434", street: "Magnolia Street", city: "Cochrane", province: "CO", postalCode: "X4Y 5Z6" } },
        // More contacts can be added here
    ];

    const contactsListEl = document.querySelector('#contactsList');
    const searchInput = document.getElementById('searchContacts');

    function renderContacts(filteredContacts = contacts) {
        contactsListEl.innerHTML = ''; // Clear existing contacts before re-rendering

        filteredContacts.forEach(contact => {
            const cardEl = document.createElement('div');
            cardEl.className = 'max-w-xs';
            cardEl.innerHTML = `
            <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="p-4">
                <h3 class="text-center text-lg text-gray-900 font-semibold">${contact.firstName} ${contact.lastName}</h3>
                <p class="text-center text-gray-500 text-sm mt-1">${contact.company}</p>
                <div class="mt-4">
                    <div class="text-sm text-gray-600">
                        <p><span class="font-semibold">Phone:</span> ${contact.phone}</p>
                        <p><span class="font-semibold">Email:</span> <a href="mailto:${contact.email}" class="text-blue-500 hover:underline">${contact.email}</a></p>
                        <p><span class="font-semibold">Website:</span> <a href="${contact.website}" target="_blank" class="text-blue-500 hover:underline">${contact.website}</a></p>
                        <p class="mt-2">
                            <span class="font-semibold">Address:</span> 
                            ${contact.address.unitNumber} , 
                            ${contact.address.civicNumber} ${contact.address.street} , 
                            ${contact.address.city}, 
                            ${contact.address.province}, 
                            ${contact.address.postalCode}
                        </p>
                    </div>
                    <div class="flex justify-end flex-gap-1 mt-4">
                        <button data-id="${contact.id}" class="edit-btn mr-2 px-4 py-2 text-xs text-blue-600 hover:text-blue-700 font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M15 3l6 6l-12 12h-6v-6z" />
                                <path d="M18 6l2 2" />
                                <path d="M6 18l-2 -2" />
                            </svg>
                        </button>
                        <button data-id="${contact.id}" class="delete-btn px-4 py-2 text-xs text-red-600 hover:text-red-700 font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <line x1="4" y1="7" x2="20" y2="7" />
                                <line x1="10" y1="11" x2="10" y2="17" />
                                <line x1="14" y1="11" x2="14" y2="17" />
                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
            `;

            contactsListEl.appendChild(cardEl);
        });

        attachDeleteEventListeners();
        attachEditEventListeners();
    }

    function attachDeleteEventListeners() {
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const contactId = this.getAttribute('data-id');
                if(confirm("Are you sure you want to delete this contact?"))
                    deleteContact(contactId);
                else
                    alert("Contact not deleted")

            });
        });
    }
    // attach edit event listeners
    function attachEditEventListeners(){
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', function() {
                const contactId = this.getAttribute('data-id');
                const contact = contacts.find(c => c.id.toString() === contactId);
        
                // Storing contact data in localStorage or sessionStorage
                localStorage.setItem('contactToEdit', JSON.stringify(contact));
        
                // Redirect to the edit page
                window.location.href = './edit-contact.html';
            });
        });
        
    }
    function deleteContact(contactId) {
        contacts = contacts.filter(contact => contact.id.toString() !== contactId);
        renderContacts(); // Re-render the contact list
    }
   
    
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredContacts = contacts.filter(contact => 
            contact.firstName.toLowerCase().includes(searchTerm) ||
            contact.lastName.toLowerCase().includes(searchTerm) ||
            contact.email.toLowerCase().includes(searchTerm)
        );
        renderContacts(filteredContacts);
    });

    renderContacts(); // Initial render of the contact list


    
});
document.addEventListener('DOMContentLoaded', () => {
    const contacts = [
        { firstName: 'John', lastName: 'Doe', company: 'Company A', phone: '+1 (123) 456-7890', email: 'john.doe@example.com' },
        { firstName: 'Jane', lastName: 'Doe', company: 'Company B', phone: '+1 (987) 654-3210', email: 'jane.doe@example.com' }
        // More contacts can be added here
    ];

    const contactsListEl = document.querySelector('#contactsList');

    contacts.forEach(contact => {
        const cardEl = document.createElement('div');
        cardEl.className = 'bg-white rounded-lg shadow overflow-hidden divide-y divide-gray-200';
        cardEl.innerHTML = `
            <section class="p-4">
                <h3 class="text-lg font-semibold">${contact.firstName} ${contact.lastName}</h3>
                <p class="text-sm text-gray-600">Company: ${contact.company}</p>
                <p class="text-sm text-gray-600">Phone: ${contact.phone}</p>
                <p class="text-sm text-gray-600">Email: ${contact.email}</p>
            </section>
            <section class="px-4 py-2 bg-gray-50 text-right">
                <button class="px-4 py-2 text-blue-600 hover:text-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M15 3l6 6l-12 12h-6v-6z" />
                    <path d="M18 6l2 2" />
                    <path d="M6 18l-2 -2" />
                    </svg>
                </button>
                <button class="px-4 py-2 text-red-600 hover:text-red-800">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <line x1="4" y1="7" x2="20" y2="7" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                </button>
            </section>
        `;
        contactsListEl.appendChild(cardEl);
    });
});


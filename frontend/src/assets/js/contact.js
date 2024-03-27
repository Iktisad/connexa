document.addEventListener("DOMContentLoaded", () => {
    let contacts = [
        // { id: "contact001", firstName: "Iktisad", lastName: "Rashid", company: "Rainier Technologies", phone: "+880 (162) 763-4056", email: "john.doe@example.com", website: "https://example.com", address: { unitNumber: "12", civicNumber: "345", street: "Elm Street", city: "Springfield", province: "SP", postalCode: "A1B 2C3" } },
        // { id: "contact002", firstName: "Jane", lastName: "Smith", company: "Globex Corporation", phone: "+1 (234) 567-8901", email: "jane.smith@example.com", website: "https://example.org", address: { unitNumber: "7", civicNumber: "890", street: "Pine Street", city: "Shelbyville", province: "SH", postalCode: "D4E 5F6" } },
        // { id: "contact003", firstName: "Alice", lastName: "Johnson", company: "Soylent Corp", phone: "+1 (345) 678-9012", email: "alice.johnson@example.com", website: "https://example.net", address: { unitNumber: "22", civicNumber: "123", street: "Oak Street", city: "Capital City", province: "CC", postalCode: "G7H 8I9" } },
        // { id: "contact004", firstName: "Bob", lastName: "Brown", company: "Initech", phone: "+1 (456) 789-0123", email: "bob.brown@example.com", website: "https://initech.com", address: { unitNumber: "55", civicNumber: "456", street: "Maple Street", city: "North Haverbrook", province: "NH", postalCode: "J1K 2L3" } },
        // { id: "contact005", firstName: "Charlie", lastName: "Davis", company: "Umbrella Corporation", phone: "+1 (567) 890-1234", email: "charlie.davis@example.com", website: "https://umbrellacorp.com", address: { unitNumber: "8B", civicNumber: "789", street: "Chestnut Street", city: "Ogdenville", province: "OG", postalCode: "M4N 5O6" } },
        // { id: "contact006", firstName: "Diana", lastName: "Evans", company: "Hooli", phone: "+1 (678) 901-2345", email: "diana.evans@example.com", website: "https://hooli.com", address: { unitNumber: "133", civicNumber: "101", street: "Birch Street", city: "Brockway", province: "BR", postalCode: "P7Q 8R9" } },
        // { id: "contact007", firstName: "Edward", lastName: "Wilson", company: "Vehement Capital Partners", phone: "+1 (789) 012-3456", email: "edward.wilson@example.com", website: "https://vehementcapital.com", address: { unitNumber: "69", civicNumber: "212", street: "Willow Street", city: "Cypress Creek", province: "CY", postalCode: "S8T 9U0" } },
        // { id: "contact008", firstName: "Fiona", lastName: "King", company: "Massive Dynamic", phone: "+1 (890) 123-4567", email: "fiona.king@example.com", website: "https://massivedynamic.com", address: { unitNumber: "661", civicNumber: "323", street: "Peachtree Street", city: "Sprocketville", province: "SP", postalCode: "V1W 2X3" } },
        // { id: "contact009", firstName: "George", lastName: "Miller", company: "Stark Industries", phone: "+1 (901) 234-5678", email: "george.miller@example.com", website: "https://starkindustries.com", address: { unitNumber: "111", civicNumber: "434", street: "Magnolia Street", city: "Cochrane", province: "CO", postalCode: "X4Y 5Z6" } },
        // More contacts can be added here
    ];

    const contactsListEl = document.querySelector("#contactsList");
    const searchInput = document.getElementById("searchContacts");
    // Fetch contact data from the backend

    // Retrieve JWT token from local storage
    const token = localStorage.getItem("token");

    function fetchContacts() {
        // Assuming the endpoint returns an array of contact objects
        fetch("http://localhost:3000/api/contacts/all", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                // Check if response status is 401 (Unauthorized)
                if (response.status === 401) {
                    // Redirect to login page or handle unauthorized access
                    alert("Not Authorized to view");
                    window.location.href = "../auth/login.html";
                    return;
                }

                return response.json();
            })
            .then((res) => {
                contacts = res.data || []; // Update the contacts array with fetched data
                renderContacts(contacts); // Render the contacts on the page
            })
            .catch((error) => console.error("Error fetching contacts:", error));
    }
    // Render contacts based on the filtered list
    function renderContacts(filteredContacts = contacts) {
        contactsListEl.innerHTML = ""; // Clear existing contacts before re-rendering
        if (contacts.length > 0) {
            filteredContacts.forEach((cont) => {
                const cardEl = createContactCard(cont);
                contactsListEl.appendChild(cardEl);
            });

            attachDeleteEventListeners();
            attachEditEventListeners();
        } else {
            // Display a message when there are no contacts to show
            const noContactsCard = document.createElement("div");
            noContactsCard.className = "text-center text-gray-500";
            noContactsCard.textContent = "Nothing to show.";
            contactsListEl.appendChild(noContactsCard);
        }
    }

    function createContactCard(contact) {
        const cardEl = document.createElement("div");
        cardEl.className = "max-w-xs";
        cardEl.innerHTML = `
        <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="p-4">
                <h3 class="text-center text-lg text-gray-900 font-semibold">${
                    contact.firstName
                } ${contact.lastName}</h3>
                <p class="text-center text-gray-500 text-sm mt-1">${
                    contact.company || ""
                }</p>
                <div class="mt-4">
                    <div class="text-sm text-gray-600">
                        <p><span class="font-semibold">Phone:</span> ${
                            contact.phone
                        }</p>
                        <p><span class="font-semibold">Email:</span> <a href="mailto:${
                            contact.email || "n/a"
                        }" class="text-blue-500 hover:underline">${
            contact.email
        }</a></p>
                        <p><span class="font-semibold">Website:</span> <a href="${
                            contact.website || "n/a"
                        }" target="_blank" class="text-blue-500 hover:underline">${
            contact.website || "n/a"
        }</a></p>
                        <p class="mt-2">
                            <span class="font-semibold">Address:</span> 
                            ${contact.address.unitNumber || "n/a"} , 
                            ${contact.address.civicNumber || "n/a"} ${
            contact.address.street
        } , 
                            ${contact.address.city || "n/a"}, 
                            ${contact.address.province || "n/a"}, 
                            ${contact.address.postalCode || "n/a"}
                        </p>
                    </div>
                    <div class="flex justify-end flex-gap-1 mt-4">
                        <button data-id="${
                            contact._id
                        }" class="edit-btn mr-2 px-4 py-2 text-xs text-blue-600 hover:text-blue-700 font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M15 3l6 6l-12 12h-6v-6z" />
                                <path d="M18 6l2 2" />
                                <path d="M6 18l-2 -2" />
                            </svg>
                        </button>
                        <button data-id="${
                            contact._id
                        }" class="delete-btn px-4 py-2 text-xs text-red-600 hover:text-red-700 font-medium">
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
        return cardEl;
    }
    function attachDeleteEventListeners() {
        document.querySelectorAll(".delete-btn").forEach((button) => {
            button.addEventListener("click", function () {
                const contactId = this.getAttribute("data-id");
                if (confirm("Are you sure you want to delete this contact?"))
                    deleteContact(contactId);
                else alert("Contact not deleted");
            });
        });
    }
    // attach edit event listeners
    function attachEditEventListeners() {
        document.querySelectorAll(".edit-btn").forEach((button) => {
            button.addEventListener("click", function () {
                const contactId = this.getAttribute("data-id");

                const contact = contacts.find(
                    (c) => c._id.toString() === contactId
                );

                // Storing contact data in localStorage or sessionStorage
                localStorage.setItem("contactToEdit", JSON.stringify(contact));

                // Redirect to the edit page
                window.location.href = "./edit-contact.html";
            });
        });
    }
    function deleteContact(contactId) {
        fetch(`http://localhost:3000/api/contacts/${contactId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to delete contact");
                }
                return response.json();
            })
            .then((data) => {
                // Filter out the deleted contact from the contacts array
                contacts = contacts.filter(
                    (contact) => contact._id.toString() !== contactId
                );
                renderContacts(); // Re-render the contacts list
            })
            .catch((error) => console.error("Error deleting contact:", error));
    }

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredContacts = contacts.filter(
            (contact) =>
                contact.firstName.toLowerCase().includes(searchTerm) ||
                contact.lastName.toLowerCase().includes(searchTerm) ||
                contact.email.toLowerCase().includes(searchTerm)
        );
        renderContacts(filteredContacts);
    });

    fetchContacts(); // Initial render of the contact list
});

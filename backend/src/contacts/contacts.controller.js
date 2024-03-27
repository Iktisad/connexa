import Contact from "./contact.model.js";
import logger from "../logger.js";
export default () => {
    // Create a new contact
    const createContact = async (req, res, next) => {
        try {
            const contact = await Contact.create(
                Object.assign({ user: req.user.userId }, req.body)
            );
            logger.info("Contact created");
            return res
                .status(201)
                .json({ data: contact, message: "Contact created" });
        } catch (error) {
            next(error);
        }
    };

    // Get all contacts
    const getAllContacts = async (req, res, next) => {
        const { user } = req;
        let statusCode = 200;
        let message = "Displaying all contacts for the user.";
        try {
            const contacts = await Contact.find({ user: user.userId }).lean();
            if (contacts.length <= 0) {
                statusCode = 404;
                message = "Sorry there are no contacts for the user";
            }
            logger.info(
                statusCode == 200
                    ? "Fetching all contacts for the user"
                    : message
            );
            return res.status(statusCode).json({
                data: contacts.length > 0 ? contacts : 0,
                message,
            });
        } catch (error) {
            next(error);
        }
    };

    // Get a single contact by ID
    const getContactById = async (req, res, next) => {
        const { id } = req.params;
        try {
            const contact = await Contact.findById(id);
            if (!contact) {
                logger.warn("Contact not found");
                return res.status(404).json({ message: "Contact not found" });
            }
            logger.info("Fetching contact by ID");
            return res.json(contact);
        } catch (error) {
            next(error);
        }
    };

    // Update a contact by ID
    const updateContactById = async (req, res, next) => {
        const { id } = req.params;
        try {
            const contact = await Contact.findByIdAndUpdate(id, req.body, {
                new: true,
            }).lean();
            if (!contact) {
                logger.warn("Contact not found");
                return res.status(404).json({ message: "Contact not found" });
            }
            logger.info("Updating contact by ID");
            return res.json({ data: contact, message: "Contact Updated" });
        } catch (error) {
            next(error);
        }
    };

    // Delete a contact by ID
    const deleteContactById = async (req, res, next) => {
        const { id } = req.params;
        console.log(id);
        try {
            const contact = await Contact.findByIdAndDelete(id);
            if (!contact) {
                logger.warn("Contact not found");
                return res.status(404).json({ message: "Contact not found" });
            }
            logger.info("Contact deleted successfully");
            return res.json({ message: "Contact deleted successfully" });
        } catch (error) {
            next(error);
        }
    };

    return {
        createContact,
        getAllContacts,
        getContactById,
        updateContactById,
        deleteContactById,
    };
};

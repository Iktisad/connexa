import express from "express";
import contactControllers from "./contacts.controller.js";
import logger from "../logger.js";
import { createOrUpdateValidation, validate } from "./contact.validator.js";

const router = express.Router();

const contact = contactControllers();
router.use((req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl}`);
    next();
});
// Create a contact
router.post("/", createOrUpdateValidation, validate, contact.createContact);

// Read all contacts
router.get("/all", contact.getAllContacts);

// Read a single contact
router.get("/:id", contact.getContactById);

// Update a contact
router.put(
    "/:id",
    createOrUpdateValidation,
    validate,
    contact.updateContactById
);

// Delete a contact
router.delete("/:id", contact.deleteContactById);

export default router;

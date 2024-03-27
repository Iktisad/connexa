import { check, validationResult } from "express-validator";

export const createOrUpdateValidation = [
    check("firstName").isString(),
    check("lastName").isString(),
    check("company").optional().isString(),
    check("phone")
        .isString()
        .matches(/^\+\d{1,4} \(\d{1,4}\) \d{3}\-\d{4}$/),
    check("email").optional().isEmail(),
    check("website")
        .optional()
        .matches(/^https?:\/\/\S+\.\S+$/),
    check("address.unitNumber").optional().isNumeric(),
    check("address.civicNumber").optional().isNumeric(),
    check("address.street").optional().isString(),
    check("address.city").optional().isString(),
    check("address.province")
        .optional()
        .isLength({ min: 2, max: 2 })
        .isUppercase(),
    check("address.postalCode")
        .optional()
        .matches(/^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/),
];

export const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({ errors: errors.array() });
        // next(new Error("Bad Request, 400"))
    }

    next();
};

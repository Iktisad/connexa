# Test Cases for Connexa (Contact Management System)

## User Authentication Module

| Test Case ID | Description                                     | Expected Result                                               | Pass/Fail |
| ------------ | ----------------------------------------------- | ------------------------------------------------------------- | --------- |
| TC_AUTH_001  | Verify login with valid username and password   | User is authenticated and directed to contact management page | Pass      |
| TC_AUTH_002  | Verify login with invalid username and password | User receives an error message indicating invalid credentials | Pass      |
| TC_AUTH_003  | Verify logout functionality                     | User is logged out and redirected to the login page           | Pass      |

## Contact Management Module

### Create Contact

| Test Case ID  | Description                                    | Steps                                                                                                                                      | Expected Result                                          | Pass/Fail |
| ------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- | --------- |
| TC_CREATE_001 | Verify creation of a contact with valid data   | 1. Navigate to contact creation page <br> 2. Enter valid contact information <br> 3. Click on 'Save' button                                | Contact is successfully created and added to the list    | Pass      |
| TC_CREATE_002 | Verify creation of a contact with invalid data | 1. Navigate to contact creation page <br> 2. Enter invalid contact information (e.g., invalid email format) <br> 3. Click on 'Save' button | User receives relevant error messages for invalid fields | Pass      |

### Read Contact

| Test Case ID | Description                                  | Steps                                                             | Expected Result                               | Pass/Fail |
| ------------ | -------------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------- | --------- |
| TC_READ_001  | Verify viewing a list of contacts            | 1. Navigate to contact list page                                  | List of contacts is displayed                 | Pass      |
| TC_READ_002  | Verify viewing details of a specific contact | 1. Navigate to contact list page <br> 2. Click on a contact entry | Details of the selected contact are displayed | Pass      |

### Update Contact

| Test Case ID  | Description                                           | Steps                                                                                                                                                                                | Expected Result                                          | Pass/Fail |
| ------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- | --------- |
| TC_UPDATE_001 | Verify updating contact information with valid data   | 1. Navigate to contact details page <br> 2. Click on 'Edit' button <br> 3. Modify contact information <br> 4. Click on 'Save' button                                                 | Contact information is successfully updated              | Pass      |
| TC_UPDATE_002 | Verify updating contact information with invalid data | 1. Navigate to contact details page <br> 2. Click on 'Edit' button <br> 3. Modify contact information to make it invalid (e.g., invalid email format) <br> 4. Click on 'Save' button | User receives relevant error messages for invalid fields | Pass      |

### Delete Contact

| Test Case ID  | Description                             | Steps                                                                                                      | Expected Result                               | Pass/Fail |
| ------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------- | --------- |
| TC_DELETE_001 | Verify deletion of a contact            | 1. Navigate to contact details page <br> 2. Click on 'Delete' button <br> 3. Confirm deletion              | Contact is successfully deleted from the list | Pass      |
| TC_DELETE_002 | Verify cancellation of contact deletion | 1. Navigate to contact details page <br> 2. Click on 'Delete' button <br> 3. Cancel deletion when prompted | Contact remains in the list                   | Pass      |

## Error Handling

| Test Case ID | Description                            | Steps                                                                                                                            | Expected Result                                                              | Pass/Fail |
| ------------ | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | --------- |
| TC_ERROR_001 | Verify handling of server-side errors  | 1. Simulate a database connection error <br> 2. Perform any action requiring database access (e.g., login, contact manipulation) | User receives a generic error message, and the error is logged on the server | Pass      |
| TC_ERROR_002 | Verify handling of unauthorized access | 1. Attempt to access contact management functionality without proper authentication                                              | User is redirected to the login page                                         | Pass      |

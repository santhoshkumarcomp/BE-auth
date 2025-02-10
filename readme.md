Auth
A user authentication and authorization using Bearer tokens in a Node.js application with Express.js, Mongoose, and JWT. The application follows the MVC pattern.
User Registration
Endpoint:
POST /auth/register
Flow:

Input Validation: Ensure that the provided data (username, email, password) is valid.
Password Hashing: The password is hashed using bcrypt before saving it to the database.
Database: Create a new user document in the MongoDB database.
Response: Return a success message or error.

Description:
This endpoint registers a new user by creating a new entry in the database. It expects a username, email, and password.

User Login
Endpoint:
POST /auth/login

Description:
This endpoint allows a user to log in by providing their email and password. Upon successful login, it returns a JWT token that can be used for authenticated requests.

Flow:

User Lookup: Search the database for a user with the given email.
Password Verification: Verify the password against the hashed password stored in the database.
JWT Generation: If the credentials are correct, generate a JWT token using the jsonwebtoken library.
Response: Return the JWT token or an error message if authentication fails.

Get User Information
Endpoint:
GET /auth/me

Description:
This endpoint returns the authenticated user's information based on the JWT token provided in the request header. The route is protected by the JWT verification middleware.

Flow:

JWT Verification: Use middleware to verify the JWT token sent in the Authorization header.
Token Decoding: Decode the token to retrieve the user's information.
Response: Return the user’s data (username, email, etc.) or an error if authentication fails.

Middleware:

Functionality:
This middleware intercepts requests to protected routes and checks the Authorization header for a valid JWT token. If the token is valid, it decodes the token and attaches the user's information to the request object for further use in the controller.

Postman Documentation:
https://documenter.getpostman.com/view/39779988/2sAYX9mzpo

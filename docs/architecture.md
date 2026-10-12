# Architecture Design - UAAventon

The UAAventon project follows a Client-Server architecture split into three core layers:

1. **Frontend (Client):** Built with Angular. Handles the presentation layer, client-side form validation, and asynchronous communication with the backend via HTTP requests.
2. **Backend (Server):** Built with Node.js and the Express framework. Acts as a RESTful API processing business logic and interacting with the database layer.
3. **Database:** MySQL. A relational database management system ensuring data integrity across user records, trips, and vehicle profiles.

## Separation of Concerns in Node.js (MVC Pattern + Routing)

To ensure clean, maintainable, and scalable code, the backend architecture adapts the Model-View-Controller pattern for a REST API by organizing logic across the following directories:

- **`Routes/`:** Defines API endpoints (e.g., `/api/trips`, `/api/users`) and routes incoming traffic to the appropriate controller.
- **`Controllers/`:** Contains business logic execution. Handles HTTP requests, processes input data (invoking models), and sends HTTP responses (e.g., 200 OK, 400 Bad Request, 500 Server Error).
- **`Models/`:** Defines data schemas and manages direct SQL queries to MySQL (e.g., creating a user, querying trip records).
- **`Middlewares/`:** Functions executed before requests reach controller handlers, primarily handling:
  - Input validation prior to controller execution.
  - Authentication verification (e.g., validating JWT tokens).
  - Authorization checks (e.g., verifying user permissions before modifying a trip).

## Entity-Relationship (ER) Model

The database schema includes the following core entities to support the defined user stories:

- **Users:** Stores account profiles, credentials, and average ratings.
- **Vehicles:** Associated with a user; stores car specifications and details.
- **Trips:** Central entity linking the driver, vehicle, schedule, route, and capacity.
- **Trip_Passengers (Junction Table):** Resolves the many-to-many relationship between passengers and trips while tracking booking statuses.
- **Ratings:** Stores user feedback and reviews following trip completion.
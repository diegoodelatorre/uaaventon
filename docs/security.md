# Security Requirements - UAAventon (Sprint 1)

To protect data integrity, confidentiality, and availability within the UAAventon platform, the following preventive security controls are established during the planning phase:

### 1. Trusted Identity (Domain Validation)
To prevent unauthorized or fraudulent registrations from outside the university, access is strictly limited to institutional accounts.
- **Implementation:** Regular expressions (Regex) will be enforced on both the client (Angular) and server (Node.js) to ensure user emails strictly match the `@edu.uaa.mx` domain.

### 2. Sensitive Data Protection (Password Hashing)
Plaintext passwords will never be stored in the MySQL database.
- **Implementation:** Passwords will be hashed using the one-way **Bcrypt** algorithm configured with 10 salt rounds. This guarantees that even in the event of an unauthorized database dump, original credentials cannot be reversed.

### 3. Input Validation & Sanitization (Injection Prevention)
All client-supplied data is treated as untrusted.
- **Implementation:** Incoming HTTP requests with payloads (POST, PUT, PATCH) will pass through validation middleware (using `express-validator`). Inputs will be validated and sanitized to mitigate **SQL Injection** and **Cross-Site Scripting (XSS)** vulnerabilities.

### 4. Secrets Management & Environment Configuration
Database credentials (username, password, host, port) and private token keys must never be committed to source control or exposed in application code.
- **Implementation:** Configuration variables will reside exclusively in environment files (`.env`). The `.env` file must be included in `.gitignore` to prevent exposure on GitHub.
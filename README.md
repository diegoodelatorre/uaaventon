# UAAventon - Ridesharing Platform

A web application developed to facilitate transportation for students at the Universidad Autónoma de Aguascalientes (UAA). The platform connects student drivers with student passengers traveling along similar routes or heading toward common destinations, optimizing daily commutes and strengthening the university community.

## Sprint 1 Goals (Planning)

- Define core architecture (Backend, Frontend, and Database).
- Design a normalized Entity-Relationship (ER) model.
- Set up a collaborative GitHub development workflow using Gitflow.
- Document functional requirements, use cases, and user stories.
- Establish initial validation and security policies.

## Key Functional Requirements

1. **Exclusive Authentication:** Account registration and login are strictly limited to institutional UAA email addresses (`@edu.uaa.mx`).
2. **Profile Management:** Users can manage their personal profiles and register one or more vehicles (if they choose to drive).
3. **Trip Publishing (Drivers):** Drivers can schedule trips by setting an origin (on UAA campus), destination, departure time, available seats, and fare (or designate the ride as free).
4. **Search and Booking (Passengers):** Passengers can browse active trips, view driver and vehicle information, and request to join.
5. **Seat Capacity Management:** Seat availability updates automatically when requests are accepted or when trips/bookings are cancelled.
6. **Rating System:** Drivers and passengers can exchange mutual feedback and star ratings upon trip completion.
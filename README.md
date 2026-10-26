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
2. **Profile Management & Driver Verification:** Users can manage their personal profiles. To become a driver and register vehicles, users must accept liability terms and provide their driver's license number (`is_driver` validation).
3. **Trip Publishing (Drivers):** Drivers can schedule trips by setting an origin (on UAA campus), destination, departure time, available seats, and fare. Destinations are integrated with the Google Places API for autocomplete and suggested route visualization.
4. **Search and Booking (Passengers):** Passengers can browse active trips, view driver and vehicle information, and request to join.
5. **Communication & Payments:** Once a trip is confirmed, students communicate directly via an integrated WhatsApp API link. The platform does not process payments; fares are paid externally (cash or direct transfer) at the time of boarding.
6. **Seat Capacity Management:** Seat availability updates automatically when requests are accepted or when trips/bookings are cancelled.
7. **Trip Lifecycle & Rating System:** Drivers manually manage trip statuses ("Scheduled", "In Progress", "Completed"). Upon completion, mutual 1 to 5-star ratings are enabled.
8. **Cancellation Penalties:** A strict 2-hour grace period is enforced. Cancellations by either driver or passenger within 2 hours of departure will result in an automatic deduction of their star rating.
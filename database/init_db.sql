-- Initialization script for UAAventon database
CREATE DATABASE IF NOT EXISTS uaaventon_db;
USE uaaventon_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    uaa_email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15),
    driver_rating DECIMAL(3,2) DEFAULT 0.0,
    passenger_rating DECIMAL(3,2) DEFAULT 0.0,
    is_driver BOOLEAN DEFAULT FALSE,
    license_number VARCHAR(50) NULL,
    is_enabled BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    color VARCHAR(30),
    license_plate VARCHAR(20) UNIQUE NOT NULL,
    is_enabled BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE trips (
    id INT AUTO_INCREMENT PRIMARY KEY,
    driver_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    origin_point VARCHAR(100) NOT NULL,
    destination_point VARCHAR(100) NOT NULL,
    destination_lat DECIMAL(10,8) NULL,
    destination_lng DECIMAL(11,8) NULL,
    total_seats INT NOT NULL,
    available_seats INT NOT NULL,
    price_per_seat DECIMAL(10,2) DEFAULT 0.00,
    departure_datetime DATETIME NOT NULL,
    status ENUM('scheduled', 'in_progress', 'completed', 'canceled') DEFAULT 'scheduled',
    is_enabled BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (driver_id) REFERENCES users(id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);

CREATE TABLE trip_passengers (
    trip_id INT,
    user_id INT,
    request_status ENUM('pending', 'accepted', 'rejected', 'canceled') DEFAULT 'pending',
    is_enabled BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (trip_id, user_id),
    FOREIGN KEY (trip_id) REFERENCES trips(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
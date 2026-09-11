-- =========================================
-- Vehicle Rental Management System
-- Database Schema
-- =========================================

CREATE DATABASE IF NOT EXISTS vehicle_rental_db;
USE vehicle_rental_db;

-- Drop tables if they already exist (handy while you're still developing)
DROP TABLE IF EXISTS rentals;
DROP TABLE IF EXISTS vehicles;
DROP TABLE IF EXISTS customers;

-- =========================================
-- Table: customers
-- =========================================
CREATE TABLE customers (
    customer_id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    driving_license VARCHAR(50) NOT NULL UNIQUE
);

-- =========================================
-- Table: vehicles
-- =========================================
CREATE TABLE vehicles (
    vehicle_id VARCHAR(10) PRIMARY KEY,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    registration_number VARCHAR(20) NOT NULL UNIQUE,
    daily_rate DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'available'
);

-- =========================================
-- Table: rentals
-- =========================================
CREATE TABLE rentals (
    rental_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id VARCHAR(10) NOT NULL,
    vehicle_id VARCHAR(10) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'booked',
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- =========================================
-- Sample data: customers
-- =========================================
INSERT INTO customers (customer_id, name, email, phone, driving_license) VALUES
('CID-0001', 'Amara Okafor', 'amara.okafor@example.com', '57891234', 'DL-10293847'),
('CID-0002', 'Liam Osei', 'liam.osei@example.com', '57654321', 'DL-88213764'),
('CID-0003', 'Fatima Diallo', 'fatima.diallo@example.com', '57432109', 'DL-55621038'),
('CID-0004', 'Kwame Mensah', 'kwame.mensah@example.com', '57345678', 'DL-77104529'),
('CID-0005', 'Naledi Dube', 'naledi.dube@example.com', '57987654', 'DL-33849201');

-- =========================================
-- Sample data: vehicles
-- =========================================
INSERT INTO vehicles (vehicle_id, brand, model, registration_number, daily_rate, status) VALUES
('VID-0001', 'Honda', 'Fit', '1234 MU 22', 35.00, 'available'),
('VID-0002', 'Toyota', 'Corolla', '5678 MU 22', 40.00, 'available'),
('VID-0003', 'Suzuki', 'Swift', '9012 MU 22', 30.00, 'rented'),
('VID-0004', 'Nissan', 'Micra', '3456 MU 22', 32.50, 'available'),
('VID-0005', 'Hyundai', 'i10', '7890 MU 22', 28.00, 'maintenance');

-- =========================================
-- Sample data: rentals
-- =========================================
INSERT INTO rentals (customer_id, vehicle_id, start_date, end_date, total_price, status) VALUES
('CID-0001', 'VID-0001', '2026-09-10', '2026-09-13', 105.00, 'completed'),
('CID-0002', 'VID-0003', '2026-09-11', '2026-09-15', 120.00, 'active'),
('CID-0003', 'VID-0002', '2026-09-12', '2026-09-14', 80.00, 'active'),
('CID-0004', 'VID-0004', '2026-09-09', '2026-09-10', 32.50, 'completed'),
('CID-0005', 'VID-0005', '2026-09-13', '2026-09-16', 84.00, 'booked');
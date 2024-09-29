-- Create the database
CREATE DATABASE user_management;

-- Switch to the new database
USE user_management;

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    dob VARCHAR(10) NOT NULL, -- Storing date of birth as string in the format 'YYYY-MM-DD'
    password VARCHAR(255) NOT NULL,
    added_by VARCHAR(50),
    added_date VARCHAR(25), -- Storing date as string, e.g., 'YYYY-MM-DD HH:mm:ss'
    modified_by VARCHAR(50),
    modified_date VARCHAR(25),
    status VARCHAR(20) -- e.g., 'ACTIVE', 'INACTIVE'
);

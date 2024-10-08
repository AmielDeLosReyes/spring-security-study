-- Create the database if not exists
CREATE DATABASE IF NOT EXISTS user_management;

-- Switch to the new database
USE user_management;

-- Drop the existing users table if it exists
DROP TABLE IF EXISTS users;

-- Create the users table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE, -- Adding email for authentication
    dob VARCHAR(10) NOT NULL, -- Storing date of birth as string in the format 'YYYY-MM-DD'
    password VARCHAR(255) NOT NULL,
    added_by VARCHAR(50),
    added_date VARCHAR(25), -- Storing date as string, e.g., 'YYYY-MM-DD HH:mm:ss'
    modified_by VARCHAR(50),
    modified_date VARCHAR(25),
    app_user_role VARCHAR(50) NOT NULL, -- Enum type for user roles
    locked BOOLEAN NOT NULL DEFAULT FALSE, -- Account locked status
    enabled BOOLEAN NOT NULL DEFAULT FALSE -- Account enabled status
);

-- Ensure the table is created properly
SELECT * FROM users;

-- Portfolio Database Schema

-- Create database
CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  github_link VARCHAR(255),
  live_link VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Messages table (for contact form)
CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users table (for future admin functionality)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample projects
INSERT INTO projects (title, description, github_link, live_link) VALUES
('Portfolio Website', 'A full-stack portfolio built with Node.js, Express, and MySQL', 'https://github.com', 'https://portfolio.example.com'),
('Chat Application', 'Real-time chat app using WebSockets and MongoDB', 'https://github.com', 'https://chat.example.com'),
('E-commerce Platform', 'Full-stack e-commerce with payment integration', 'https://github.com', NULL);

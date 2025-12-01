-- Migration: Add status and isSuspended columns to users table
-- Date: 2025-12-01

ALTER TABLE users 
ADD COLUMN status ENUM('active', 'suspended', 'deleted') NOT NULL DEFAULT 'active' AFTER role,
ADD COLUMN isSuspended BOOLEAN NOT NULL DEFAULT FALSE AFTER status;

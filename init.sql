CREATE DATABASE IF NOT EXISTS mydb;

USE mydb;

CREATE TABLE IF NOT EXISTS users (
    userid INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM("Moderator","Participant") NOT NULL
);

CREATE TABLE IF NOT EXISTS admin (
    adminid INT AUTO_INCREMENT PRIMARY KEY,
    adminname VARCHAR(50) NOT NULL UNIQUE,
    role ENUM("admin") NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS meeting (
    meetingid INT AUTO_INCREMENT PRIMARY KEY,
    mtname VARCHAR(100) NOT NULL,
    description TEXT,
    meeting_date DATETIME NOT NULL,
    state ENUM('pending','ongoing','finished') DEFAULT 'pending'
);

CREATE TABLE IF NOT EXISTS meeting_participant (
    meetingid INT NOT NULL,
    userid INT NOT NULL,
    PRIMARY KEY (meetingid, userid),
    FOREIGN KEY (meetingid) REFERENCES meeting(meetingid) ON DELETE CASCADE,
    FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE
);

INSERT INTO admin (adminname, password)
VALUES ('admin1', '123456');

INSERT INTO users (username, password)
VALUES ('khettawan','123456')
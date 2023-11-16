CREATE TABLE users(
id VARCHAR(255) PRIMARY KEY NOT NULL ,
fullName VARCHAR(255) NOT NULL, 
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(MAX) NOT NULL,
dateJoined DATE  DEFAULT GETDATE() NOT NULL,
role VARCHAR (255) DEFAULT 'user' NOT NULL,
isDeleted INT DEFAULT 0 NOT NULL
);

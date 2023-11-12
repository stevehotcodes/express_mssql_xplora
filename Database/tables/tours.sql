CREATE  TABLE tours(
id VARCHAR(255) PRIMARY KEY NOT NULL,
title VARCHAR(255) NOT NULL,
tourType VARCHAR (255) NOT NULL,
destination VARCHAR(255) NOT NULL, 
duration VARCHAR(255) UNIQUE NOT NULL,
price VARCHAR(255) NOT NULL,
availableDate DATE  DEFAULT GETDATE() NOT NULL,
eventStatus  VARCHAR(255) DEFAULT ' not booked' CHECK (eventStatus IN ('booked','happening','completed')),
isDeleted INT DEFAULT 0 NOT NULL,
userID VARCHAR (255)  FOREIGN KEY REFERENCES users(id)
)

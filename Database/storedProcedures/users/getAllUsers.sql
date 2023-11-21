CREATE OR ALTER PROCEDURE getAllUsers
AS
BEGIN
    SELECT * FROM users WHERE role='user' AND isDeleted=0
END
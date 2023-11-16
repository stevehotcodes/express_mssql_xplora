CREATE OR ALTER PROCEDURE getBookedToursByUser(
    @userID  VARCHAR(255)
)
AS
BEGIN
    SELECT tours.* ,users.fullName
    FROM tours
    LEFT JOIN users ON tours.userID=users.id
    WHERE tours.userID=@userID
END
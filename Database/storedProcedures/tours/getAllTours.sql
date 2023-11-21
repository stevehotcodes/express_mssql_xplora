CREATE OR ALTER PROCEDURE getAllTours
AS
BEGIN
    SELECT tours.*,users.fullName
    FROM tours
    LEFT JOIN users ON tours.userID=users.id
    WHERE tours.isDeleted=0
    

END
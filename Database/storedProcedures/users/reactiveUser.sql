CREATE OR ALTER PROCEDURE reactivateeUser(
    @id VARCHAR (255)
)
AS
BEGIN
    UPDATE users
    SET isDeleted=0
    WHERE isDeleted=1 AND id=@id
END
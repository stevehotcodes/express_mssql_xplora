CREATE OR ALTER PROCEDURE deleteUser(
    @id VARCHAR (255)
)
AS
BEGIN
    UPDATE users
    SET isDeleted=1
    WHERE isDeleted=0 AND id=@id
END
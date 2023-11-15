CREATE OR ALTER PROCEDURE deleteEvent(
    @id VARCHAR (255)
)
AS
BEGIN
    UPDATE tours
    SET isDeleted=1
    WHERE isDeleted=0 AND id=@id
END
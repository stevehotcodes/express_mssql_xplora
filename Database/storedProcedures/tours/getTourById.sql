CREATE OR ALTER PROCEDURE getTourById(
    @id VARCHAR (255)
)
AS 
BEGIN
    SELECT *
    FROM  tours
    WHERE id=@id
END


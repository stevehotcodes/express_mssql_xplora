CREATE OR ALTER PROCEDURE updateUser(
    @id VARCHAR (255),
    @email VARCHAR (255),
    @password VARCHAR(255)
)
AS
BEGIN
    UPDATE users
    SET email=@email ,password=@password
    WHERE id=@id
END
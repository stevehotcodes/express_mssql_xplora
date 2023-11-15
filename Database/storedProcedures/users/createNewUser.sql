CREATE OR ALTER PROCEDURE createNewUSer(
    @id VARCHAR (255),
    @fullName VARCHAR(255),
    @email VARCHAR(255),
    @password VARCHAR (255)
)
AS
BEGIN
 INSERT INTO users (id ,fullName,email,password)
 VALUES (@id,@fullName,@email,@password)
END
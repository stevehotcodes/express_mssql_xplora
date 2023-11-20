CREATE OR ALTER PROCEDURE getTourTypesBy
@tourType VARCHAR(255)
AS
BEGIN
    SELECT *
    FROM tours
    WHERE tourType=@tourType
END
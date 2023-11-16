CREATE OR ALTER PROCEDURE updateTourToBooked(
    @id VARCHAR(255),
    @userID VARCHAR(255)
)
AS 
BEGIN
    UPDATE tours
    SET eventStatus='booked',userID=@userID
    WHERE id=@id
END

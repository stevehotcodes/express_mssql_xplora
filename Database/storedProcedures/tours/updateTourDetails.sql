CREATE OR ALTER PROCEDURE updateTourDetails(
     @id VARCHAR(255),
    @title VARCHAR(255),
    @tourType VARCHAR (255) ,
    @destination VARCHAR(255), 
    @price VARCHAR (255),
    @availableDate VARCHAR (255),
    @image VARCHAR (255),
    @slots VARCHAR (255),
    @duration VARCHAR(255)
)
AS 
BEGIN
    UPDATE tours
    SET title=@title, tourType=@tourType, destination=@destination,price=@price,availableDate=@availableDate,image=@image, @slots=@slots,duration=@duration
    WHERE id=@id
END


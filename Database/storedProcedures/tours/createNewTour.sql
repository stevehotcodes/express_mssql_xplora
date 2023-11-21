
CREATE OR ALTER PROCEDURE createNewTour (
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
    INSERT INTO tours (id,title,tourType,destination,price,availableDate,image,duration,slots)
    VALUES(@id,@title,@tourType,@destination,@price,@availableDate,@image,@duration,@slots)
END
DELIMITER $$
DROP FUNCTION IF EXISTS f_media;
CREATE FUNCTION f_media(datum DATETIME) RETURNS INT
DETERMINISTIC
BEGIN
	DECLARE found INT;
		SELECT COUNT(*) INTO found 
        FROM mediauitingen 
        WHERE mediauitingen.datum = DATE(datum);
	RETURN found;
END$$
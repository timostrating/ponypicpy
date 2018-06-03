CREATE VIEW view1 AS
SELECT
	HOUR(datum) AS uur, 
    DAYNAME(datum) AS dag,
    WEEK(datum) AS week,
    DAY(datum) AS dagnummer
FROM aanmeldingen 
WHERE f_media(aanmeldingen.datum) > 0;

SELECT * FROM view1;

CREATE VIEW view2 AS
SELECT 
	datum, 
	HOUR(datum) AS uur, 
    DAYNAME(datum) AS dag,
    WEEK(datum) AS weeknummer,
    DAY(datum) AS dagnummer,
	f_media(.datum)
FROM ponydb.aanmeldingen;


use ponydb;

-- OUR VESION
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
DELIMITER ;


-- EXCERCISE VERSION
DELIMITER $$
DROP FUNCTION IF EXISTS f_media;
CREATE FUNCTION f_media(weeknumer int, dagnummer int, media varchar(45)) RETURNS INT
DETERMINISTIC
BEGIN
	DECLARE found INT;
		SELECT COUNT(*) INTO found 
        FROM mediauitingen 
        WHERE mediauitingen.datum = DATE_ADD(MAKEDATE(2011, weeknumer), INTERVAL dagnummer DAY) 
			AND mediauitingen.categorie LIKE CONCAT('%',media,'%');
	RETURN found;
END$$
DELIMITER ;

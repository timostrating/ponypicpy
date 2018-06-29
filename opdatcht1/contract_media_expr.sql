SELECT
	HOUR(datum) AS uur, 
    DAYNAME(datum) AS dag,
    WEEK(datum) AS week,
    DAY(datum) AS dagnummer
FROM aanmeldingen 
WHERE f_media(aanmeldingen.datum) > 0
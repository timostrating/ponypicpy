SELECT 
	datum, 
	HOUR(datum) AS uur, 
    DAYNAME(datum) AS dag,
    WEEK(datum) AS week,
    DAY(datum) AS dagnummer
FROM ponydb.aanmeldingen;
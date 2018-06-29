SELECT 
	MIN(datum) as datum, 
	HOUR(datum) AS uur, 
	DAYNAME(datum) AS dag,
	WEEK(datum) AS weeknummer,
	DAY(datum) AS dagnummer
	count(*) as aantal_uitingen,
FROM ponydb.aanmeldingen
GROUP BY datum
ORDER BY aantal DESC;

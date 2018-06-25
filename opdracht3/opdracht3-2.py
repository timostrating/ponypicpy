import mysql.connector
from pattern.nl import sentiment

# We beginnen met het opzetten van een connectie met onze database server 
cnx = mysql.connector.connect(user='____', password='____', host='____', database='____', port=12345)
cursor = cnx.cursor()

# Nu gaan we de groeppeerde data uit de database halen 
query = ("""
SELECT 
    WEEKOFYEAR(a.datum) as w, 
    count(a.id), 
    group_concat(DISTINCT m.titel),
    group_concat(DISTINCT m.opmerkingen) 
FROM aanmeldingen as a
	LEFT JOIN mediauitingen as m ON WEEKOFYEAR(a.datum) = WEEKOFYEAR(m.datum) 
GROUP BY w;
""")
cursor.execute(query)

weeks = []

# Deze gaan we nu verwerken
for (w, aanmeldingen, opmerking_array, titel_array) in cursor:
    pos, neg, neutraal = 0, 0, 0

    if opmerking_array is not None:
        opmerkingen = opmerking_array.split(",")
        titels = titel_array.split(",")
        titels.extend(["","","",""]) # there are some empty cells in the database
        for i in range(len(opmerkingen)):
            # we plakken de TITEL en OPMERKING aan elkaar vast en bepalen daar van het sentiment 
            sentiment_analysis = sentiment(titels[i] +" "+opmerkingen[i])[0]
            if sentiment_analysis  > 0.1: # sentiment is Positief
                pos += 1
            elif sentiment_analysis < -0.1: # sentiment is Negatief
                neg += 1
            else:
                neutraal += 1 # Het is ZEER moeilijk om het sentiment binnen de nederlandse taal te bepalen daarom heb ik neutraal ook toegevoegd als mogelijkheid 
    else:
        opmerkingen = []

    weeks.append([w, aanmeldingen, len(opmerkingen), pos, neg, neutraal])

# Tabel
print("WEEK, \t AANME \t NIEUWS\t POS \t NEG \t NEUTRAAL")
for week in weeks:
    print "{0} \t {1} \t {2} \t {3} \t {4} \t {5}".format(week[0], week[1], week[2], week[3], week[4], week[5])

cursor.close()
cnx.close()
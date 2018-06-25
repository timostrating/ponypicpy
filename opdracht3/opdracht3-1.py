import mysql.connector

# We beginnen met het opzetten van een connectie met onze database server 
cnx = mysql.connector.connect(user='____', password='____', host='____', database='____', port=12345)
cursor = cnx.cursor()

# Nu gaan we de groeppeerde data uit de database halen 
query = ("""
SELECT 
    WEEKOFYEAR(datum) as w, 
    count(*) as cur,
    (select count(id) from aanmeldingen) as totaal
FROM aanmeldingen 
group by w;
""")
cursor.execute(query)

# Bovenkantje van de tabel
print("WEEK, \t X, \t P(X)")

# Deze data zetten we daarna op het scherm
for (w, cur, totaal) in cursor:
  print("{0} \t {1} \t {2}%".format(
      w, cur, round(cur / float(totaal), 4) * 100))

cursor.close()
cnx.close()
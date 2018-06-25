import mysql.connector

# We beginnen met het opzetten van een connectie met onze database server 
cnx = mysql.connector.connect(user='____', password='____', host='____', database='____', port=12345)
cursor = cnx.cursor()

# Nu gaan we de groeppeerde data uit de database halen 
query = ("""
SELECT 
    WEEKOFYEAR(datum) as w, 
    count(*) as cur
FROM aanmeldingen 
group by w;
""")
cursor.execute(query)

classes = {}
for i in range(1, 16):
    classes[i] = 0

# laten we de klassen maken
for (w, cur) in cursor:
  classes[int(cur / 250)] += 1

# tabel op het scherm zetten
print("Klasse, \t \t Aantal")
for j in range(len(classes)):
    i = j+1 
    print("{0}-{1} \t {2}".format(i*250, (i+1)*250, classes[i]))

cursor.close()
cnx.close()
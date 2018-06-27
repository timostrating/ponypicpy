import mysql.connector
from pattern.nl import sentiment

xstr = lambda s: s or ""

conn = mysql.connector.connect(user='____', password='____', host='____', database='____', port=12345)
conn2 = mysql.connector.connect(user='____', password='____', host='____', database='____', port=12345)

cursor = conn.cursor()
cursor2 = conn2.cursor()

query = ("SELECT id, titel, tekst  FROM ponydb.nieuws;")
cursor.execute(query)

# laten we de klassen maken
for (id, titel, tekst) in cursor:
    # sentiment(text) returns (polarity, subjectivity).
    sentimentAnalyse = sentiment(str(xstr(titel).encode('ascii', 'ignore')) +" "+ str(xstr(tekst).encode('ascii', 'ignore')))
    # print [titel, tekst, sentimentAnalyse[0], sentimentAnalyse[1]]
    query2 = ("UPDATE nieuws SET sentiment={1}, subjectiviteit={2} WHERE id={0}".format(id, sentimentAnalyse[0], sentimentAnalyse[1]))
    cursor2.execute(query2)


conn2.commit()

# close connections
cursor2.close(); conn2.close()
cursor.close(); conn.close()



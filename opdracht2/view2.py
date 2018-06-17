import matplotlib.pyplot as plt
import datetime
import mysql.connector

cnx = mysql.connector.connect(user='___', password='___', host='___', database='___', port=12345)
cursor = cnx.cursor()

query = ("""
SELECT 
    DAYOFWEEK(datum) AS d, COUNT(*) / 52
FROM 
    ponydb.aanmeldingen
GROUP BY d;
""")

cursor.execute(query)

aanmeldingenPerDag = {}

for (day, count) in cursor:
  aanmeldingenPerDag[day - 1] = count

plot = []
for i in range(0, 7):
    plot.append(aanmeldingenPerDag[i] if i in aanmeldingenPerDag else 0)

cursor.close()
cnx.close()


plt.plot(plot)
plt.xticks([i for i in range(0, 7)], [
    "maandag",
    "dinsdag",
    "woensdag",
    "donderdag",
    "vrijdag",
    "zaterdag",
    "zondag"
])

font = {'family':'serif', 'color':'blue', 'weight':'normal', 'size':16}
fontbig = {'family':'serif', 'color':'blue', 'weight':'bold', 'size':24}

plt.title('Gemiddeld aantal overstappers over een week', fontdict=fontbig)
plt.ylabel('Aantal overstappers', fontdict=font)
plt.xlabel('dag van de week', fontdict=font)
plt.show()
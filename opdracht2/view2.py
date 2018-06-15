import matplotlib.pyplot as plt
import datetime
import mysql.connector

cnx = mysql.connector.connect(user='root', password='erstaateenpaardindegang', host='aitai.nl', database='ponydb', port=15069)
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

plt.show()
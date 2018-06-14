import matplotlib.pyplot as plt
import datetime
import mysql.connector

cnx = mysql.connector.connect(user='root', password='erstaateenpaardindegang', host='aitai.nl', database='ponydb', port=15069)
cursor = cnx.cursor()

query = ("""
SELECT 
    HOUR(datum) AS h, COUNT(*) / 365
FROM 
    ponydb.aanmeldingen
GROUP BY h;
""")

cursor.execute(query)

aanmeldingenPerUur = {}

for (hour, count) in cursor:
  aanmeldingenPerUur[hour] = count

plot = []
for i in range(0, 24):
    plot.append(aanmeldingenPerUur[i] if i in aanmeldingenPerUur else 0)

cursor.close()
cnx.close()


plt.plot(plot)
plt.xticks([i for i in range(0, 24)], ["{}:00".format(i if i >= 10 else "0" + `i`) for i in range(0, 24)])

plt.show()
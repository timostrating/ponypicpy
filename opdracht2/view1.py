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
fig = plt.figure()
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

font = {'family':'serif', 'color':'blue', 'weight':'normal', 'size':16}
fontbig = {'family':'serif', 'color':'blue', 'weight':'bold', 'size':24}

plt.title('Gemiddeld aantal overstappers over een dag', fontdict=fontbig)
plt.ylabel('Aantal overstappers', fontdict=font)
plt.xlabel('Uur van de dag', fontdict=font)
plt.show()
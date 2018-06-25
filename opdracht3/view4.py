import matplotlib.pyplot as plt
import datetime
import mysql.connector

cnx = mysql.connector.connect(user='____', password='____', host='____', database='____', port=12345)
cursor = cnx.cursor()

query = ("""
SELECT 
    DAYOFYEAR(datum) AS d, COUNT(*)
FROM 
    ponydb.aanmeldingen
GROUP BY d;
""")

cursor.execute(query)

aanmeldingenPerDag = {}

for (day, count) in cursor:
  aanmeldingenPerDag[day - 1] = count

plot = []
for i in range(0, 365):
    plot.append(aanmeldingenPerDag[i] if i in aanmeldingenPerDag else 0)

cursor.close()
cnx.close()


plt.plot(plot)
# plt.xticks([i for i in range(0, 7)], [
#     "maandag",
#     "dinsdag",
#     "woensdag",
#     "donderdag",
#     "vrijdag",
#     "zaterdag",
#     "zondag"
# ])

font = {'family':'serif', 'color':'blue', 'weight':'normal', 'size':16}
fontbig = {'family':'serif', 'color':'blue', 'weight':'bold', 'size':24}

plt.title('Het aantal overstrappers over het hele jaar', fontdict=fontbig)
plt.ylabel('Aantal overstappers', fontdict=font)
plt.xlabel('dag van het jaar', fontdict=font)
plt.show()
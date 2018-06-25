import matplotlib.pyplot as plt
import datetime
import mysql.connector

cnx = mysql.connector.connect(user='____', password='____', host='____', database='____', port=12345)
cursor = cnx.cursor()

query = ("""
SELECT 
    WEEKDAY(datum) AS d, COUNT(*) / 52
FROM 
    ponydb.aanmeldingen
GROUP BY d;
""")

cursor.execute(query)

plot = []
for (day, count) in cursor:
  plot.append(count)

cursor.close()
cnx.close()

for i in range(0, 7):
    plt.bar(i, plot[i], 0.9)

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

plt.title('Aantal overstappers in een gemiddelde week', fontdict=fontbig)
plt.ylabel('Aantal overstappers', fontdict=font)
plt.xlabel('dag van de week', fontdict=font)
plt.subplots_adjust(left=0.05, right=0.98,
                    top=0.95, bottom=0.05,
                    hspace=0, wspace=0)
plt.show()
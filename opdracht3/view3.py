import mysql.connector
import datetime
import matplotlib.pyplot as plt
import matplotlib.dates as mdates

cnx = mysql.connector.connect(user='____', password='____', host='____', database='____', port=12345)
cursor = cnx.cursor()

query = ("""
    SELECT date(datum), count(*)
    FROM aanmeldingen 
    GROUP BY date(datum)
""")
cursor.execute(query)

dates=[]; counts=[]
for (datum, count) in cursor:
    dates.append(datum); counts.append(count)

fig, ax1 = plt.subplots()
ax2 = ax1.twinx()  # instantiate a second axes that shares the same x-axis
ax1.plot(dates, counts)
ax1.xaxis.set_major_locator(mdates.MonthLocator())
ax1.grid(True)



query2 = ("""
    SELECT DAYOFYEAR(datum), count(*)
    FROM mediauitingen 
    GROUP BY 1 
    order by 1;
""")

cursor.execute(query2)
mediauitingen_per_dag={}
for (dayofyear, count) in cursor:
    mediauitingen_per_dag[dayofyear] = count


counts=[]
for i in range(0, 365):
    counts.append(mediauitingen_per_dag[i] if i in mediauitingen_per_dag else 0)



color = 'tab:red'
ax2.bar(dates, counts, color=color, alpha=0.2)
ax2.tick_params(axis='y', labelcolor=color)
# ax2.set_ylim(0,7)



font = {'family':'serif', 'color':'blue', 'weight':'normal', 'size':16}
fontbig = {'family':'serif', 'color':'blue', 'weight':'bold', 'size':24}

plt.title('Overstappers in relatie tot de nieuwuitingen', fontdict=fontbig)
# ax2.ylabel('Aantal nieuwuitingen', fontdict=fontred)
# ax1.ylabel('Aantal overstappers', fontdict=fontblue)
plt.xlabel('Maanden van het jaar', fontdict=font)
plt.subplots_adjust(left=0.03, right=0.98,
                    top=0.95, bottom=0.05,
                    hspace=0, wspace=0)
plt.show()

cursor.close()
cnx.close()
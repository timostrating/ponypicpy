import mysql.connector
import datetime
import matplotlib.pyplot as plt
import matplotlib.dates as mdates

cnx = mysql.connector.connect(user='root', password='erstaateenpaardindegang', host='aitai.nl', port="15069", database='ponydb')
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

font = {'family':'serif', 'color':'blue', 'weight':'normal', 'size':16,}

fig, ax1 = plt.subplots()
ax1.plot(dates, counts)
ax1.xaxis.set_major_locator(mdates.MonthLocator())
ax1.grid(True)




ax2 = ax1.twinx()  # instantiate a second axes that shares the same x-axis


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
ax2.bar(dates, counts, color=color)
ax2.tick_params(axis='y', labelcolor=color)
ax2.set_ylim(0,7)





# fig.autofmt_xdate()
# plt.xlabel('Month', fontdict=font)
plt.show()

cursor.close()
cnx.close()
import mysql.connector
from pattern.nl import sentiment

# We beginnen met het opzetten van een connectie met onze database server 
cnx = mysql.connector.connect(user='____', password='____', host='____', database='____', port=12345)
cursor = cnx.cursor()

# Nu gaan we de groeppeerde data uit de database halen 
query = ("""
SELECT 
    WEEKOFYEAR(a.datum) as w, 
    count(a.id), 
    group_concat(DISTINCT m.titel),
    group_concat(DISTINCT m.opmerkingen) 
FROM aanmeldingen as a
	LEFT JOIN mediauitingen as m ON WEEKOFYEAR(a.datum) = WEEKOFYEAR(m.datum) 
GROUP BY w;
""")
cursor.execute(query)

weeks = []

# Deze gaan we nu verwerken
for (w, aanmeldingen, opmerking_array, titel_array) in cursor:
    pos, neg, neutraal = 0, 0, 0

    if opmerking_array is not None:
        opmerkingen = opmerking_array.split(",")
        titels = titel_array.split(",")
        titels.extend(["","","",""]) # there are some empty cells in the database
        for i in range(len(opmerkingen)):
            # we plakken de TITEL en OPMERKING aan elkaar vast en bepalen daar van het sentiment 
            sentiment_analysis = sentiment(titels[i] +" "+opmerkingen[i])[0]
            if sentiment_analysis  > 0.1: # sentiment is Positief
                pos += 1
            elif sentiment_analysis < -0.1: # sentiment is Negatief
                neg += 1
            else:
                neutraal += 1 # Het is ZEER moeilijk om het sentiment binnen de nederlandse taal te bepalen daarom heb ik neutraal ook toegevoegd als mogelijkheid 
    else:
        opmerkingen = []

    weeks.append([w, aanmeldingen, len(opmerkingen), pos, neg, neutraal])






import numpy as np
import matplotlib.pyplot as plt
# ik gebruik matplotlib om de visualalisaties te maken
from matplotlib.ticker import MaxNLocator
from collections import namedtuple

pos, neg, neutraal, counts = [], [], [], []
for week in weeks:
    counts.append(week[1])
    pos.append(week[3])
    neg.append(week[4])
    neutraal.append(week[5])

fig, ax = plt.subplots()

index = np.arange(len(weeks))
bar_width = 0.35
rects1 = ax.bar(index, pos, bar_width,
                alpha=0.2, color='g', label='Positief')
rects3 = ax.bar(index + bar_width*2, neutraal, bar_width,
                alpha=0.2, color='b', label='Neutraal')
rects2 = ax.bar(index + bar_width, neg, bar_width,
                alpha=0.2, color='y', label='Negatief')

# we hebben onze barcharts nu laten we ook de aanmeldingen toevoegen
ax2 = ax.twinx()
ax2.plot(range(1, 53), counts, 'r', label="aanmeldingen")

ax.set_xlabel('Week')
ax.set_ylabel('Aantal nieuwsuitingen')
ax.set_xticks(index + bar_width / 2)
ax.set_xticklabels(range(1,53))
ax.legend()

fig.tight_layout()
plt.subplots_adjust(left=0.05, right=0.95,
                    top=0.95, bottom=0.05,
                    hspace=0, wspace=0)
plt.show()
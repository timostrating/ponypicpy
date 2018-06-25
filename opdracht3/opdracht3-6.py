import mysql.connector

# We beginnen met het opzetten van een connectie met onze database server 
cnx = mysql.connector.connect(user='____', password='____', host='____', database='____', port=12345)
cursor = cnx.cursor()

# Nu gaan we de groeppeerde data uit de database halen 
query = ("""
SELECT 
    WEEKOFYEAR(a.datum) as w, 
    count(a.id) as X,
    count(DISTINCT m.id) as Y
FROM aanmeldingen as a
	LEFT JOIN mediauitingen as m ON WEEKOFYEAR(a.datum) = WEEKOFYEAR(m.datum) 
group by w;
""")
cursor.execute(query)

X = []; Y = []
for (w, x, y) in cursor:
    X.append(x)
    Y.append(y)


# Display the data
# import matplotlib.pyplot as plt

# fig, ax = plt.subplots()
# ax.scatter(Y, X)

# ax.legend()
# ax.grid(True)

# plt.subplots_adjust(left=0.05, right=0.95, top=0.95, bottom=0.05, hspace=0, wspace=0)
# plt.show()



# import numpy
# print numpy.corrcoef(Y, X)[0, 1]

import numpy
print numpy.std(X)
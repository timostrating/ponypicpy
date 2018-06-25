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
    if w > 15 and w <= 27: # We filteren hier de gefraagde periode er uit
        X.append(x)
        Y.append(y)

from scipy import stats

a, b, r_value, p_value, std_err = stats.linregress(X,Y)
print a
print b
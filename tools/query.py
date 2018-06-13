import datetime
import mysql.connector

cnx = mysql.connector.connect(user='root', password='lol123', host='localhost', database='ponydb')
cursor = cnx.cursor()

query = ("SELECT date, titel FROM mediauitingen")

cursor.execute(query)

print(cursor)

for (date, titel) in cursor:
  print(u"{} - {}".format(date, titel))

cursor.close()
cnx.close()

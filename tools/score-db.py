import mysql.connector
import re

xstr = lambda s: s or ""


conn = mysql.connector.connect(user='____', password='____', host='____', database='____', port=12345)
conn2 = mysql.connector.connect(user='____', password='____', host='____', database='____', port=12345)

cursor = conn.cursor()
cursor2 = conn2.cursor()

query = ("SELECT id, titel, tekst  FROM ponydb.nieuws;")
cursor.execute(query)

woordernarray = [
    "licht", 
    "gas", 
    "energie", "stroom", "electriciteit", 
    "overstappen", 
    "windenergie", "zonne-energie", "kernenergie", "zonnepanelen", "windmolen", "windturbine", "centrale",
    "budget energie", "delta", "dong energy", "e.on", "electrabel", "eneco", "energiedirect.nl", "energieflex", "essent", "greenchoice", "huismerk energie", "nederlandse energie maatschappij", "nuon", "oxxio", "qurrent", "vandebron",
    "groene", "grijse", "opwekken",
    "co2", "duurzaam", 
    "provider", "aanbieder", "leverancier", 
    "duurder", "goedkoper", "prijs valt", "prijs is", "prijzen", "dalende prij",
    "nam", "aardbeving",
    "watt"]

maxscore = 0

# laten we de klassen maken
for (id, titel, tekst) in cursor:
    content = str(xstr(titel).encode('ascii', 'ignore')) +" "+ str(xstr(tekst).encode('ascii', 'ignore'))
    score = 1

    for i in range(len(woordernarray)):
        score *= min(10, len(re.findall(woordernarray[i], content.lower())) + 1)

    if score > maxscore:
        maxscore = score
        print maxscore
    query2 = ("UPDATE nieuws SET relevantiescore={1} WHERE id={0}".format(id, min(score, 2*10**9)))
    cursor2.execute(query2)


conn2.commit()

# close connections
cursor2.close(); conn2.close()
cursor.close(); conn.close()



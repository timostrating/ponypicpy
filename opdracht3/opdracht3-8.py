import csv
from dateutil import parser

dates = [] # in deze array zullen 165000 items komen te staan

reader2013 = csv.reader(open('2013.csv'), delimiter=' ', quotechar='|')
for row in reader2013:
    if len(row) > 1:
        dates.append(parser.parse(row[1]))

reader2014 = csv.reader(open('2014.csv'), delimiter=' ', quotechar='|')
for row in reader2014:
    if len(row) > 1:
        dates.append(parser.parse(row[0]))
        

# Import required packages
import pandas as pd
import datetime
import numpy as np

score_list = [1] * len(dates)

# We gebruiken pandas dit is een soort vna excel binnen python
df = pd.DataFrame()

# Dit is een stukje panda code om als een excel bestand met de date te kunnen werken
df['datetime'] = dates
df['datetime'] = pd.to_datetime(df['datetime'])
df.index = df['datetime'] 
df['score'] = score_list


# laten we naar de maanden gaan kijken
print df.resample('M').sum()
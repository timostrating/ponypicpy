# import csv
# from dateutil import parser

# dates = [] # in deze array zullen 165000 items komen te staan

# reader2013 = csv.reader(open('2013.csv'), delimiter=' ', quotechar='|')
# for row in reader2013:
#     if len(row) > 1:
#         dates.append(parser.parse(row[1]))

# reader2014 = csv.reader(open('2014.csv'), delimiter=' ', quotechar='|')
# for row in reader2014:
#     if len(row) > 1:
#         dates.append(parser.parse(row[0]))
        

# # Import required packages
# import pandas as pd
# import datetime
# import numpy as np

# score_list = [1] * len(dates)

# # We gebruiken pandas dit is een soort vna excel binnen python
# df = pd.DataFrame()

# # Dit is een stukje panda code om als een excel bestand met de date te kunnen werken
# df['datetime'] = dates
# df['datetime'] = pd.to_datetime(df['datetime'])
# df.index = df['datetime'] 
# df['score'] = score_list


# # laten we naar de maanden gaan kijken
# print df.resample('M').sum()


datums = [ "13-01","13-02","13-03","13-04","13-05","13-06","13-07","13-08","13-09","13-10","13-11","13-12","14-01","14-02","14-03","14-04","14-05","14-06","14-07","14-08","14-09","14-10","14-11","14-12"]
y = [ 4408, 3791, 4410, 3963, 4145, 5523, 6027, 5248, 5183, 5579, 8081, 8610, 7209, 8918, 7518, 5850, 6253, 6827, 8686, 8371, 7718, 8519, 10328, 13835 ]
x = range(len(y))

# import matplotlib.pyplot as plt
from pylab import *

(m,b) = polyfit(x,y,1)
yp = polyval([m,b],x)
plot(x, yp, "y--")
plot(datums, y)

show()


# Matplotlib is the big name for drawing graphs. 
# But is is a bit confusing because matplotlib contains multiple libraries where pyplot is one of them.


import matplotlib.pyplot as plt
import numpy as np

import matplotlib
matplotlib.use('TkAgg')

n = 3
x = np.array([0,1,2])
y = np.array([0,1,2])

fig, ax = plt.subplots()
fit = np.polyfit(x, y, deg=1)
ax.plot(x, fit[0] * x + fit[1], color='black')
ax.scatter(x, y, color='black')



sumxy = 0
# sumxy_array = [0]
for i in range(0, n):
    sumxy += x[i]*y[i]
    # sumxy_array.append(sumxy)
    
plt.plot([0, 2], [0, sumxy], marker = 'o', linestyle='--',  label="n * SUM x*y")


sumx = float(sum(x))
plt.plot([0, 2], [0, sumx], marker = 'o', linestyle='--',  label="SUM x")


sumy = float(sum(y))
plt.plot([0, 2], [0, sumy], marker = 'o', linestyle='--',  label="SUM y")


top = n*sumxy - sumx * sumy
plt.plot([0, 2], [0, top], marker = 'o', linestyle='-.',  label="top")



sumx2 = 0
for i in range(0, n):
    sumx2 += x[i]**2

plt.plot([0, 2], [0, n*sumx2], marker = 'o', linestyle='--',  label="n * SUM x^2")

plt.plot([0, 2], [0, sumy**2], marker = 'o', linestyle='--',  label="SUM(y) ^2")


bot = n*sumx2 - sumx * sumy
plt.plot([0, 2], [0, top], marker = 'o', linestyle='-.',  label="bot")



plt.legend(bbox_to_anchor=(1.05, 1), loc=2, borderaxespad=0.)

plt.show()
fig.show()
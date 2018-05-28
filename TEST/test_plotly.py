import plotly as py
import plotly.figure_factory as ff
py.tools.set_credentials_file(username='USERNAME', api_key='API_KEY')

import numpy as np

# Add histogram data
x1 = np.random.randn(200)-2  
x2 = np.random.randn(200)  
x3 = np.random.randn(200)+2  
x4 = np.random.randn(200)+4  

# Group data together
hist_data = [x1, x2, x3, x4]

group_labels = ['Group 1', 'Group 2', 'Group 3', 'Group 4']

# Create distplot with custom bin_size
fig = ff.create_distplot(hist_data, group_labels, bin_size=.2)

# Plot!
py.plotly.iplot(fig, filename='Distplot with Multiple Datasets')
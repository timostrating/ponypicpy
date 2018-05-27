# Dash brings plotly graphs to the web using plotly in the backend.
# Dash can be used like there in a standalone way. In the backend dash is secerty setting up a flask server.
# You can aslo to this the other way around and add dash as a react thing to your flask server.


import dash
import dash_core_components as dcc
import dash_html_components as html

app = dash.Dash()

app.layout = html.Div(children=[
    html.H1("jheee"),
    dcc.Graph(id='example',
              figure={ 
                  'data': [
                      {'x':[1,2,3,4,5], 'y':[5,6,7,8,9], 'type':'line', 'name':'boats'},
                      {'x':[1,2,3,4,5], 'y':[8,3,5,6,2], 'type':'bar', 'name':'cars'}
                      ]
                })
    ])

if __name__ == '__main__':
    app.run_server(debug=True)
from dash import dash
from flask import Flask

server = Flask(__name__)
app = dash.Dash(__name__, server=server)

@server.route("/")
def hello():
    return "Hello World!"
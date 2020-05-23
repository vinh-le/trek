import json
from flask import Flask, request, redirect, g, render_template, jsonify, session
import requests

app = Flask(__name__)

# API given coordinates and distance to generate randomized route
@app.route('/route/<lat>/<lon>/<d>')
def route(lat, lon, d):
    new_lat = str(float(lat) + float(d) / 69)
    url = "https://maps.googleapis.com/maps/api/directions/json?origin=" + lat + "," + lon + "&destination=" + lat + "," + lon + "&mode=walking"+ "&waypoints=" + new_lat + "," + lon + "&key=AIzaSyAai4YqEuIUOKHQl8i1LgPcM6JEjyIFuuM"
    response_dict = requests.get(url).json()
    return response_dict

if __name__ == '__main__':
   app.run(debug = True)
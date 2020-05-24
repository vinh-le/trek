import json
from flask import Flask, request, redirect, g, render_template, jsonify, session
import requests
import random, math

app = Flask(__name__)

# API given coordinates and distance to generate randomized route
@app.route('/route/<lat>/<lon>/<d>/<parks>/<water>/<nature>/<drinks>')
def route(lat, lon, d, parks, water, nature, drinks):

    p = parks == "true" or parks == "True"
    w = water == "true" or water == "True"
    n = nature == "true" or nature == "True"
    dr = drinks == "true" or drinks == "True"

    if (not p and not w and not n and not dr):
        degree = random.randint(0, 360)
        new_dist = (float(d) / 69) / 4

        url = "https://maps.googleapis.com/maps/api/directions/json?origin=" + lat + "," + lon + "&destination=" + lat + "," + lon + "&mode=walking" + "&waypoints="
        for i in range(3):
            rad = math.radians(degree)
            new_lat = float(lat) + new_dist * math.sin(rad)
            new_lon = float(lon) + new_dist * math.cos(rad)
            url = url + str(new_lat) + "," + str(new_lon) + "|"

            degree = (degree + 90) % 360


        response_dict = requests.get(url).json()
        return jsonify(response_dict)
    else:
        type = ""
        look = True
        while look:
            choice = random.randint(1,4)
            if choice is 1:
                if p:
                    look = False
                    type = "parks"
            elif choice is 2:
                if w:
                    look = False
                    type = "lakes"
            elif choice is 3:
                if n:
                    look = False
                    type = "nature preserves"
            else:
                if dr:
                    look = False
                    type = "drinks"
        url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lon + "&radius=" + str(float(d) * 1609 / 5) +"&key=AIzaSyAPukIkWU-qeCIlpyWlnikgU4uLQLmWCvw&keyword="
        if p:
            url += type
        response_dict = requests.get(url).json()

        url = "https://maps.googleapis.com/maps/api/directions/json?origin=" + lat + "," + lon + "&destination=" + lat + "," + lon + "&mode=walking" + "&waypoints="
        rand = random.randint(0, len(response_dict["results"])-1)
        url += str(response_dict["results"][rand]["geometry"]["location"]["lat"]) + "," + str(response_dict["results"][rand]["geometry"]["location"]["lng"]) + "|"
        degree = 120
        rad = math.radians(degree)
        new_dist = (float(d) / 69) / 4
        new_lat = float(response_dict["results"][rand]["geometry"]["location"]["lat"]) + new_dist * math.sin(rad)
        new_lon = float(response_dict["results"][rand]["geometry"]["location"]["lng"]) + new_dist * math.cos(rad)
        url = url + str(new_lat) + "," + str(new_lon) + "|"

        response_dict = requests.get(url).json()
        return jsonify(response_dict)

if __name__ == '__main__':
   app.run(debug = True)
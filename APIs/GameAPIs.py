from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime

import GameEngine
app = Flask(__name__)
CORS(app)


active_games = {}

TIME_LIMIT_SECONDS = 120


@app.get("/api/airports")
def get_airports():
    airports = GameEngine.fetch_random_airports()
    return jsonify(airports)

if __name__ == "__main__":
    # Debug mode only for development
    app.run(debug=True)
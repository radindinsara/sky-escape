from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime

import GameEngine
from GameEngine import SkyEscapeGame
from Queries import log_action

app = Flask(__name__)
CORS(app)


# In-memory store for running games
# key = game_id (int from database), value = SkyEscapeGame object
active_games = {}

# How many seconds one game lasts
TIME_LIMIT_SECONDS = 120


@app.get("/api/airports")
def get_airports():
    airports = GameEngine.fetch_random_airports()
    return jsonify(airports)
@app.post("/api/move")
def move():
    data = request.get_json()
    ident = data.get("ident")

    # here you would adapt your GameEngine to handle one move,
    # not the whole input() loop
    # e.g. result = game.handle_move(ident)

    # dummy response example:
    result = {
        "message": f"Moved to {ident}",
        "score": game.score,
    }
    return jsonify(result)

if __name__ == "__main__":
    # Debug mode only for development
    app.run(debug=True)
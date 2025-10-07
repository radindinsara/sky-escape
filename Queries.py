from datetime import datetime

import DBconnection as db


def register_player(name, role):
    conn = db.get_db()
    if not conn:
        return None
    cursor = conn.cursor(dictionary=True)

    # Check if player already exists
    cursor.execute("SELECT * FROM players WHERE name = %s", (name,))
    player = cursor.fetchone()

    if player:
        player_id = player["id"]
    else:
        cursor.execute("INSERT INTO players (name, role) VALUES (%s, %s)", (name, role))
        conn.commit()
        player_id = cursor.lastrowid

    conn.close()
    return player_id

def fetch_random_airports(limit=10):
    conn = db.get_db()
    if not conn:
        return []
    cursor = conn.cursor(dictionary=True)
    cursor.execute(f"SELECT id, ident, name, iso_country FROM airport ORDER BY RAND() LIMIT {limit}")
    airports = cursor.fetchall()
    conn.close()
    return airports

def log_action(game_id, description):
    """Log every move or event."""
    conn = db.get_db()
    if not conn:
        return
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO game_actions (game_id, action_time, description)
        VALUES (%s, %s, %s)
    """, (game_id, datetime.datetime.now(), description))
    conn.commit()
    conn.close()

def update_game_result(game_id, score, result, end_time):
    """Update the existing record with final score and result."""
    conn = db.get_db()
    if not conn:
        return
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE game_results
        SET score = %s, result = %s, end_time = %s
        WHERE id = %s
    """, (score, result, end_time, game_id))
    conn.commit()
    conn.close()

def update_player_stats(player_id, score):
    """Update total games and total score for a player."""
    conn = db.get_db()
    if not conn:
        return
    cursor = conn.cursor()
    cursor.execute("""UPDATE players SET total_games = total_games + 1, total_score = total_score + %s WHERE id = %s""", (score, player_id))
    conn.commit()
    conn.close()

def save_game_result(player_id, role, score, result, start_time, end_time):
    """Save final game result to the database."""
    conn = db.get_db()
    if not conn:
        return None
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO game_results (player_id, role, start_time, end_time, score, result)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (player_id, role, start_time, end_time, score, result))
    conn.commit()
    game_id = cursor.lastrowid
    conn.close()
    return game_id
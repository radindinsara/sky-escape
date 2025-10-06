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
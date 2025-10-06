import DBconnection as db


def register_player(name, role):
    conn = db.get_db()
    if not conn:
        return None
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM players WHERE name = %s", (name,))
    player = cursor.fetchone()
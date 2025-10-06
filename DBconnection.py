import mysql.connector

# Establish database connection
def get_db():
    return mysql.connector.connect(
        host='127.0.0.1',
        port=3306,
        database='flight_game',
        user='root',
        password='1111',
        autocommit=True
)
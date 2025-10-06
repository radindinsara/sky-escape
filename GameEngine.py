from datetime import time

from Queries import( register_player)

class SkyEscapeGame:
    def __init__(self, player_name, role):
        self.player_name = player_name
        self.role = role
        self.player_id = register_player(player_name, role)
        self.airports = []



    def play(self):
        start_time = time.time()

        while time.time() - start_time < 120:  # 2-minute timer

            available = [a for a in self.airports if a['ident'] not in self.visited_by_player]
            if not available:
                print("⚠️ No more airports left to visit! Ending game early.")
                break

            move_ident = input("\nEnter the airport you want to move to: ").strip().upper()
            selected_airport = next((a for a in self.airports if a['ident'].upper() == move_ident), None)
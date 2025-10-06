from datetime import time

from Queries import( register_player, log_action)

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
            if not selected_airport:
                print("❌ Invalid IDENT. Try again.")
                continue

            if selected_airport['ident'] in self.visited_by_player:
                print("⚠️ You already visited this airport. Choose another one.")
                continue

            self.player_airport = selected_airport
            self.visited_by_player.add(selected_airport['ident'])
            print(f"\nYou moved to: {self.player_airport['name']} ({self.player_airport['ident']})")
            log_action(self.game_id, f"Player moved to {self.player_airport['name']} ({self.player_airport['ident']})")
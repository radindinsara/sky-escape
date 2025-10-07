from datetime import time, datetime
from random import random

from Queries import( register_player, log_action, fetch_random_airports)

class SkyEscapeGame:
    def __init__(self, player_name, role):
        self.player_name = player_name
        self.role = role
        self.score = 250 if role == "Police" else 0
        self.start_time = datetime.datetime.now()
        self.player_id = register_player(player_name, role)
        self.game_id = None
        self.airports = []
        self.golden_airport = None
        self.player_airport = None
        self.computer_airport = None
        self.visited_by_player = set()

    def setup_game(self):
        self.airports = fetch_random_airports(10)
        self.golden_airport = random.choice(self.airports)

        print("\n🗺️ 10 Airports Loaded from Database:")
        for a in self.airports:
            print(f" - {a['ident']} → {a['name']} ({a['iso_country']})")

        self.player_airport = random.choice(self.airports)
        self.computer_airport = random.choice([a for a in self.airports if a != self.player_airport])

        print("Opponent airport" ,self.computer_airport)

        self.visited_by_player.add(self.player_airport['ident'])

        print(f"Your starting airport: {self.player_airport['name']} ({self.player_airport['ident']})")
        print("\nGame starts now! Timer: 2 minutes ⏰\n")

        # Save game start
        self.game_id = save_game_result(
            self.player_id, self.role, self.score, "In Progress", self.start_time, self.start_time
        )
        log_action(self.game_id, f"Game started. Player: {self.player_name}, Role: {self.role}")


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

            if self.player_airport == self.golden_airport:
                self.score += 5
                print(f"⭐ You reached the Golden Airport! +5 Bonus Points!")
                log_action(self.game_id, f"Golden Airport reached — bonus +5 points. New Score: {self.score}")


            # Check if caught
            if self.player_airport == self.computer_airport:
                print("\n💥 Both met at the same airport!")
                self.end_game("Win" if self.role == "Police" else "Lose")
                message = "🎯 You caught the thief!" if self.role == "Police" else "🚨 You were caught!"
                print(message)
                return

            # Score update
            self.score = self.score - 10 if self.role == "Police" else self.score + 10
            print(f"Current Score: {self.score}")
            log_action(self.game_id, f"Score updated: {self.score}")

import time
import random
import sys
import datetime
from Queries import (
    fetch_random_airports,
    save_game_result,
    log_action,
    register_player,
    update_player_stats,
    update_game_result
)

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

    def intro(self):
        title = "\033[95m\033[1m🎮 SKY ESCAPE 🎮\033[0m\n"
        print(title.center(80))
        time.sleep(1)

    def story(self):
        story = """
🌍 International Manhunt Begins! 🌍

A master thief has struck again — vanishing into the skies,
moving from airport to airport across the globe.
The world is watching as Interpol launches a high-stakes mission.

✈️ The chase is on!
"""
        for char in story:
            sys.stdout.write(char)
            sys.stdout.flush()
            time.sleep(0.02)
            print("\n")

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

            if self.player_airport == self.computer_airport:
                print("\n💥 Both met at the same airport!")
                self.end_game("Win" if self.role == "Police" else "Lose")
                message = "🎯 You caught the thief!" if self.role == "Police" else "🚨 You were caught!"
                print(message)
                return

            self.score = self.score - 10 if self.role == "Police" else self.score + 10
            print(f"Current Score: {self.score}")
            log_action(self.game_id, f"Score updated: {self.score}")

            # Time-out result
        result = "Win" if self.role == "Thief" else "Lose"
        msg = "🎉 You escaped successfully!" if self.role == "Thief" else "⌛ The thief escaped!"
        print(msg)
        self.end_game(result)
        print(f"Final Score: {self.score}")

    def end_game(self, result):
        end_time = datetime.datetime.now()
        update_game_result(self.game_id, self.score, result, end_time)
        update_player_stats(self.player_id, self.score)
        log_action(self.game_id, f"Game ended: {result}")
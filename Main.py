from GameEngine import SkyEscapeGame

def main():

    print("\n🎮 Welcome to SKY ESCAPE!")
    name = input("Enter your name: ")

    print(f"{name} Choose your role:")
    print("1) 👮 Police")
    print("2) 🏃 Thief")
    role_choice = input("Enter choice (1 or 2): ")
    role = "Police" if role_choice == "1" else "Thief"

    # Create and run the game instance
    game = SkyEscapeGame(name, role)
    game.intro()
    game.story()
    game.setup_game()
    game.play()

if __name__ == "__main__":
    main()

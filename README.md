# Sky Escape ✈️

**Sky Escape** is a Python-based prototype flight game built as part of the **Software Project 1** course.  
The game uses real airport data from a relational database and allows the player to take the role of either **Police** or **Thief**.  

## Game Idea
- At the start, the player chooses a **role**:
  - **Thief**: Start at a random airport and move between airports to avoid capture.  
  - **Police**: Start at a random airport and try to catch the thief.  
- The game continues until:
  - Police and Thief land on the same airport → **Police wins**.  
  - Thief successfully avoids capture → **Thief wins**.  

## Features
- Random starting airports for Police and Thief.  
- Turn-based gameplay loop:
  - Thief moves → Police moves → check encounter.  
- Personalized gameplay (player name + role).  
- Exit anytime by pressing **Enter**.  
- Relational database integration for airport data.  

## Requirements
- Python 3.9+  
- SQLite (or another relational database) with airport dataset.  

## How to Run
1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/sky-escape.git
   cd sky-escape

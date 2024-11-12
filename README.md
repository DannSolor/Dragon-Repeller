Dragon Repeller - A JavaScript Adventure Game
Overview

"Dragon Repeller" is an interactive role-playing game (RPG) built using vanilla JavaScript. The game allows players to embark on a journey to fight monsters, gain experience, and collect gold and weapons in a fictional world. The player must navigate between different locations, interact with NPCs, fight monsters, and make decisions to survive and win the game. The objective is to defeat the mighty dragon and become victorious.
Features

    Inventory System: The player can collect weapons and health potions throughout the game.
    Monster Battles: Engage in turn-based combat with various monsters, including slimes, fanged beasts, and dragons.
    Gold and Experience: Earn gold and experience points (XP) from defeating monsters.
    Store System: Purchase health and weapons using gold at the in-game store.
    Game Progression: The player can progress through different locations and story elements.

Technologies Used

    HTML: The structure of the game and page elements.
    CSS: Styling of the game interface.
    JavaScript: The game logic, including combat mechanics, inventory management, and location navigation.
    DOM Manipulation: Handling game updates through interactions with HTML elements.

Game Mechanics

    Character Stats:
        Health: The player's health starts at 100 and can be increased by purchasing health from the store.
        XP (Experience Points): Gained by defeating monsters. Accumulating enough XP will allow the player to level up.
        Gold: The in-game currency used to buy health potions and weapons.
        Weapons: The player starts with a "stick" and can purchase better weapons such as a "dagger," "claw hammer," and "sword" to improve combat strength.

    Locations:
        Town Square: The starting point. From here, players can go to the store, cave, or fight the dragon.
        Store: Purchase health (10 gold for 10 health) and weapons (30 gold per weapon).
        Cave: Fight different monsters: Slime, Fanged Beast, and Dragon.
        Fight: Combat against the monster. Players can choose to attack, dodge, or run.

    Combat System:
        Players battle monsters by clicking the "Attack" or "Dodge" button.
        Each monster has its own health and level, influencing the strength of their attacks.
        The player can earn gold and XP after defeating monsters.
        The game features random events where the monster might miss, and the player can dodge attacks.

    Win/Loss Conditions:
        Lose: If the player's health reaches 0, they die, and the game prompts for a restart.
        Win: Defeat the dragon and complete the game. Victory is celebrated with a "YOU WIN!" message.

How to Play

    Start the Game:
        The game begins at the "Town Square." From here, you can choose to visit the store, explore the cave, or challenge the dragon.

    Store:
        In the store, you can buy health (10 gold = 10 health) or purchase new weapons (30 gold per weapon). Each weapon increases your attack power.

    Combat:
        Once you're in the cave, you can choose to fight different monsters. Select "Fight Slime," "Fight Fanged Beast," or "Fight Dragon" based on your progress.
        During combat, you can choose to attack, dodge, or run.
        Defeating a monster rewards you with XP and gold. Gold can be used to buy health or new weapons, while XP helps you level up.

    Progression:
        As you fight and defeat monsters, you will level up and improve your equipment.
        The goal is to defeat the dragon and win the game.

    Game Over:
        If you lose all your health in combat, the game will end and prompt you to restart.

File Structure

DragonRepeller/
│
├── index.html         # The HTML file for game structure
├── style.css          # The CSS file for styling the game
├── script.js          # The JavaScript file for game logic
├── assets/            # Folder for images and icons (if applicable)
│   └── monster-icons/ # Icons for monsters (optional)
├── README.md          # This README file
└── LICENSE            # License information (if applicable)


Installation

    Clone the repository:

git clone https://github.com/DannSolor/Dragon-Repeller.git

Open the project:

    Navigate to the project folder and open the index.html file in your browser.

    cd dragon-repeller
    open index.html

    Play the Game:
        Enjoy playing the game directly in your web browser. There is no need for additional installations.

Gameplay Walkthrough

    You Start in the Town Square:
        From here, you have three options:
            Go to the store (where you can buy health or weapons).
            Go to the cave (where you can fight monsters).
            Fight the dragon (if you're ready).

    In the Store:
        You can purchase health (10 gold = 10 health) or weapons (30 gold per weapon).
        Each weapon has more power, making it easier to defeat tougher monsters.

    In the Cave:
        Choose from three monsters to fight:
            Slime: Low level, easy to defeat.
            Fanged Beast: Medium level, harder to defeat.
            Dragon: The final boss. Requires significant strength and strategy.

    During Combat:
        Choose to attack, dodge, or run.
        Defeat the monster to earn gold and XP.

    Game Over:
        If your health reaches 0, the game ends, and you can restart.

    Victory:
        Defeat the dragon to win the game!

Game Logic

The game is built using simple JavaScript, with the following key components:

    Stats Tracking: Gold, health, and experience are tracked and displayed on the screen.
    Combat Mechanics: Monsters attack the player, and the player can choose to fight back or dodge.
    Weapon System: The player starts with a basic weapon and can upgrade it by purchasing new weapons at the store.
    Monster Encounters: Different monsters appear at different stages, each with its own unique stats and difficulty.

Contributing

If you'd like to contribute to the development of this project, feel free to submit a pull request or open an issue. Contributions are always welcome!

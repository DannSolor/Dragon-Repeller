// Initial player stats
let xp = 0;             // Player experience points
let health = 100;       // Player health points
let gold = 50;          // Player gold
let currentWeaponIndex = 0; // Tracks current weapon in the inventory array
let fighting;           // Index for the current monster being fought
let monsterHealth;      // Monster's health during a fight
let inventory = ["stick"]; // Initial inventory with a basic weapon

// Select DOM elements for updating the game interface
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

// Arrays for game data
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];
const monsters = [
  { name: "slime", level: 2, health: 15 },
  { name: "fanged beast", level: 8, health: 60 },
  { name: "dragon", level: 20, health: 300 }
];
const locations = [
  { // Town Square location with three actions
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\"."
  },
  { // Store location with buying options
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  { // Cave location with monsters to fight
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
  },
  { // Fighting location during battle
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },
  { // Victory state after defeating a monster
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  { // Lose state if player dies
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;"
  },
  { // Win state after defeating the dragon
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
  }
];

// Initialize game buttons with default actions
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// Update function to change game locations and actions
function update(location) {
  monsterStats.style.display = "none"; // Hide monster stats unless in a fight
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

// Functions to handle navigation
function goTown() { update(locations[0]); }
function goStore() { update(locations[1]); }
function goCave() { update(locations[2]); }

// Purchase health with gold
function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

// Purchase or upgrade weapon
function buyWeapon() {
  if (currentWeaponIndex < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeaponIndex++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeaponIndex].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

// Sell a weapon if possible
function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

// Functions for choosing monster battles
function fightSlime() { fighting = 0; goFight(); }
function fightBeast() { fighting = 1; goFight(); }
function fightDragon() { fighting = 2; goFight(); }

// Set up fight and display monster stats
function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}
function attack() {
  // Display the monster's attack message.
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  
  // Add the player's attack message with their current weapon.
  text.innerText += " You attack it with your " + weapons[currentWeaponIndex].name + ".";
  
  // Deduct health based on the monster's attack value.
  health -= getMonsterAttackValue(monsters[fighting].level);
  
  // Check if the player successfully hits the monster.
  if (isMonsterHit()) {
    // If the player hits, deduct health from the monster based on the weapon's power and a random XP modifier.
    monsterHealth -= weapons[currentWeaponIndex].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    // If the player misses, display a message.
    text.innerText += " You miss.";
  }
  
  // Update the health and monster's health on the screen.
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  
  // If the player's health reaches 0, trigger the loss condition.
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    // If the monster's health reaches 0, check if the player is fighting the dragon (fighting === 2).
    // If so, trigger the win condition. Otherwise, defeat the monster.
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  
  // If there's a 10% chance, and the player has more than 1 item in their inventory,
  // remove the last item (weapon) from the inventory and display it as broken.
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    
    // Decrement the weapon index as the player's weapon is broken.
    currentWeaponIndex--;
  }
}


// Calculate monster attack strength based on level
function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

// Determine if the monster lands a hit
function isMonsterHit() { return Math.random() > .2 || health < 20; }

// Player dodges monster attack
function dodge() { text.innerText = "You dodge the attack from the " + monsters[fighting].name; }

// Handle monster defeat and rewards
function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

// Handle player losing the game
function lose() { update(locations[5]); }

// Handle winning the game by defeating the dragon
function winGame() { update(locations[6]); }

// Restart game and reset stats
function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeaponIndex = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}
// Activates an Easter egg by updating the game location to a special hidden location.
function easterEgg() {
  update(locations[7]); // Assumes locations[7] is a special Easter egg location
}

// Calls the pick function with a guess of 2
function pickTwo() {
  pick(2);
}

// Calls the pick function with a guess of 8
function pickEight() {
  pick(8);
}

// Main function for guessing a number in a randomly generated set
function pick(guess) {
  const numbers = []; // Initialize an empty array to hold random numbers

  // Fill the array with 10 random numbers between 0 and 10
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }

  // Display the player's guess and the generated random numbers
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n"; // Append each random number to the displayed text
  }

  // Check if the player's guess is in the list of random numbers
  if (numbers.includes(guess)) {
    // If the guess is correct, reward player with 20 gold and update display
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    // If the guess is incorrect, deduct 10 health points and update display
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;

    // If health drops to 0 or below, call the lose function to end the game
    if (health <= 0) {
      lose();
    }
  }
}

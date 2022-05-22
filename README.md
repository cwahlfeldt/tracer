# tracer

### goal of game (for now!)
to defeat all enemies on map


### rules

1. initialize a hex grid map
2. the hex grid map will have random untraversable tiles - IMPLEMENT LATER
3. the amount of untraversable tiles can be specified and will increase as the game progresses - IMPLEMENT LATER
4. a player object will spawn on the grid at the start of a game
5. enemies will spawn on the map
6. enemies cannot spawn in range of the player
7. it is the players turn at the start of a game
8. move player to a neighbor tile during its turn
9. when a player has moved to the tile it becomes the enemy turn
10. during the enemies turn, enemy will move towards the player
11. when the enemy has moved to its tile it becomes the players turn
12. if an enemy is on a neighbor tile the player can move to the enemies tile to attack the enemy
13. after an attack the player will move back to the tile it started the attack on. The enemy will die, and it will be the enemies turn
14. if the player moves to an enemies neighbor tile the enemy will attack the player which will result in a loss of 1 health point. After the attack the enemy moves back to the tile it attacked from and it becomes the players turn.
15. if there are no enemies left on the map the player has won the game.

implementing these rules will allow for a simple game that can easily be iterated on.

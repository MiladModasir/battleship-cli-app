// bulid a printBoard function

/* The board is that data structure that we showed you above. 
It's an array of objects that represent the ships in the positions they belong.
 */


/* The purpose of this `debug` flag is to help us, 
the developers understand if we're printing our board correctly, and later help us determine if we:

- placed our ships correctly
- are changing the board correctly

All that it does is, if `debug` is true, 
then we should reveal ALL THE SHIPS, regardless of if they have been hit or not.
But if the debug flag is false, we ONLY reveal positions that have been "hit".
 */
// we need to take a bord(2D array of objects) and print it using console.table
// if debug is true, we should print all the ships even if not hit
// if debug is false, we should print only the ships that have been hit
// create an output objrct


// create a unique shipId counter
    // start from 1;
    // Increment it every time you place a ship
    // use this as the id when calling placeSingleShip
    // loop to place large ships
    // Each time call placeSingleShip


    // Bulid the guess flow
    // loop ask for input 
    // check if the guess is valid
    // if valid mark cell as true print "Hit!" or "Miss!"
      // break out of the loop

// logic for has won(board)
  // step1;
  //loop through every row in the board
  // step2;
  // loop through every cell in the row
  // step3;
  // for each call if the cell is ship (type === " small" || large),
  // and its not hit yet the game is not won 
  // step4;
  // if no un-hit ship parts are found, game is won 
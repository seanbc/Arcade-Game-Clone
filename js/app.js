// Define Enemy variable our player needs to avoid & its properties
var Enemy = function(x,y, speed) {
     this.x = x;
     this.y = y + 55;
     this.speed = speed;
     this.sprite = 'images/enemy-bug.png';
     this.step = 101;
     this.boundary = this.step * 5;
     this.resetPos = -this.step;
};

// Define the Hero class & its propertirs
class Hero {
      constructor() {
        this.sprite = 'images/char-boy.png';
        this.step = 101;
        this.jump = 83;
        this.startX = this.step * 2;
        this.startY = (this.jump * 4) + 55;
        this.x = this.startX;
        this.y = this.startY;
        this.victory = false;
      }
      // Draw hero sprite on its x and y position
      render() {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
      }

      // modify player x & y property based on what argument is passed to this method
      // Set paramaters so player cannot go off screen
      handleInput(input) {
        switch(input) {
            case 'left':
            if (this.x > 0) {
              this.x -= this.step;
            }
            break;

            case 'up':
            if (this.y > this.jump) {
            this.y -= this.jump;
            }
            break;

            case 'right':
            if (this.x < this.step * 4) {
            this.x += this.step;
            }
            break;

            case 'down':
            if (this.y < this.step * 3.5) {
            this.y += this.jump;
            }
            break;
            }
    }

   update() {
         for (let enemy of allEnemies) {
            //Check if there has been a collision between Player and Enemy
           if (this.y === enemy.y && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2)) {
           this.reset();
             }
         if (this.y === 55) { // If player reaches 55 on Y axis, player has won
           this.victory = true;
           }
         }
       }
     // Reset Player position if there has been a colission
     reset() {
      this.y = this.startY;
      this.x = this.startX;
     }
}

// Initialize object player
const player = new Hero();

// Enemies our player must avoid
// Argumentspassed in represent x & y starting positions and speed
const bug1 = new Enemy(-100, 0, 200);
const bug2 = new Enemy(-100, 83, 300);
const bug3 = new Enemy((-100*2.5), 83, 300);
const bug4 = new Enemy(-500, 166, 400);
const bug5 = new Enemy(-600, 166, 400);
// Place all enemy objects in an array called allEnemies
const allEnemies = [];
// Push all enemy objects into allEnemies
allEnemies.push(bug1, bug2, bug3, bug4, bug5);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Check if Enemy has passes the boundary:
// Either sets enemy speed or puts enemy in reset position
Enemy.prototype.update = function(dt) {
if (this.x < this.boundary) {
    // Moving forward increments x by speed * dt
    this.x += this.speed * dt;
  }
  else {
    // Reset enemy position back to the start
    this.x = this.resetPos;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

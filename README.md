# Ping Pong Game

A classic two-player Ping Pong game built with HTML5 Canvas and JavaScript.

## Features

- 🎮 Two-player gameplay
- 📊 Real-time score tracking
- 🎨 Smooth animations and modern UI
- ⌨️ Keyboard controls
- 🔄 Ball physics with paddle spin
- ⏸️ Pause/Resume functionality

## How to Play

1. Open `index.html` in your web browser
2. Press **SPACE** to start the game
3. Control your paddle:
   - **Player 1**: Press `W` to move up, `S` to move down
   - **Player 2**: Press `UP ARROW` to move up, `DOWN ARROW` to move down
4. Use **SPACE** to pause/resume at any time
5. Press `R` to reset the game

## Game Rules

- Each player controls a paddle on their side of the screen
- The ball bounces between paddles
- If the ball passes your paddle, the opponent scores a point
- The ball's movement is affected by where it hits the paddle (spin effect)
- The game continues until you decide to reset

## Files

- `index.html` - Game markup and structure
- `style.css` - Styling and visual design
- `script.js` - Game logic and mechanics
- `README.md` - This file

## Technical Details

- Built with vanilla HTML5 Canvas API
- No external dependencies
- Responsive canvas with fixed dimensions (800x400)
- Smooth 60 FPS game loop using `requestAnimationFrame`
- Collision detection for balls and paddles

Enjoy playing! 🏓

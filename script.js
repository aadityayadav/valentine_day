// Gift Box Interaction
// document.getElementById('gift-box').addEventListener('click', () => {
//     const giftBox = document.getElementById('gift-box');
    
//     // Hide gift box and show riddle section
//     giftBox.classList.add('hidden');
//     document.getElementById('riddle-section').classList.remove('hidden');
//   });
  
document.getElementById('gift-box').addEventListener('click', () => {
    const giftBox = document.getElementById('gift-box');
    
    // Hide gift box and show riddle section
    giftBox.classList.add('hidden');
    document.getElementById('riddle-section').classList.remove('hidden');
    
    // Trigger heart explosion animation
    triggerHeartExplosion();
  });
  
  function triggerHeartExplosion() {
    const heartsContainer = document.getElementById('hearts-container');
    const numberOfHearts = 30; // Adjust the number of hearts
  
    for (let i = 0; i < numberOfHearts; i++) {
      const heart = document.createElement('div');
      heart.classList.add('heart');
      heart.innerText = '❤️';
      
      // Position hearts randomly
      const randomX = Math.random() * 100 - 50 + 'vw'; // Random horizontal distance
      const randomY = Math.random() * 100 - 50 + 'vh'; // Random vertical distance
      heart.style.setProperty('--x', randomX);
      heart.style.setProperty('--y', randomY);
      
      // Add heart to the container
      heartsContainer.appendChild(heart);
      
      // Remove heart after animation
      setTimeout(() => {
        heart.remove();
      }, 1000); // The time should match the animation duration
    }
  }
  
// Riddle Interaction
    document.getElementById('submit-riddle').addEventListener('click', () => {
        const answer = document.getElementById('riddle-answer').value.trim().toLowerCase(); // Normalize input
        const feedback = document.getElementById('riddle-feedback');
    
        if (answer === 'ar') { // Normalize expected answer to lowercase
        feedback.textContent = 'Correct! 🎉';
        feedback.style.color = 'green';
        setTimeout(() => {
            document.getElementById('riddle-section').classList.add('hidden');
            document.getElementById('puzzle-section').classList.remove('hidden');
        }, 1000);
        } else {
        feedback.textContent = 'Try again! 😅';
        feedback.style.color = 'red';
        feedback.classList.remove('hidden');
        }
    });
    
  
  // Puzzle Interaction
  let solvedPieces = 0;
  
  document.querySelectorAll('.heart-piece').forEach((piece) => {
    piece.addEventListener('click', () => {
      if (!piece.classList.contains('solved')) {
        piece.textContent = '❤️'; // Change broken heart to full heart
        piece.classList.add('solved');
        solvedPieces++;
  
        // Add scale-up animation
        piece.style.transform = 'scale(1.3)';
        setTimeout(() => piece.style.transform = 'scale(1)', 200);
  
        if (solvedPieces === 5) {
          setTimeout(() => {
            document.getElementById('puzzle-section').classList.add('hidden');
            document.getElementById('maze-section').classList.remove('hidden');
          }, 500);
        }
      }
    });
  });
  
 // Maze Configuration
const mazeLayout = [
    ['S', 'P', 'W', 'W', 'W', 'P', 'E'], // S = Start, E = End, P = Path, W = Wall
    ['W', 'P', 'W', 'P', 'P', 'P', 'W'],
    ['W', 'P', 'W', 'P', 'W', 'P', 'W'],
    ['W', 'P', 'P', 'P', 'W', 'P', 'W'],
    ['W', 'W', 'W', 'P', 'W', 'P', 'W'],
  ];
  
  const mazeContainer = document.getElementById('maze');
  let playerPosition = { x: 0, y: 0 }; // Initial position of the player (Start)
  
  // Generate Maze Grid
  function generateMaze() {
    mazeContainer.innerHTML = ''; // Clear previous content
  
    mazeLayout.forEach((row, y) => {
      row.forEach((cell, x) => {
        const div = document.createElement('div');
        div.classList.add('maze-cell');
  
        if (cell === 'S') {
          div.classList.add('start');
          div.innerHTML = '<span class="player">❤️</span>'; // Add player to start
        } else if (cell === 'E') {
          div.classList.add('end');
        } else if (cell === 'W') {
          div.classList.add('wall');
        } else if (cell === 'P') {
          div.classList.add('path');
        }
  
        // Set data attributes for position
        div.dataset.x = x;
        div.dataset.y = y;
  
        mazeContainer.appendChild(div);
      });
    });
  }
  
  // Move Player Function
  function movePlayer(dx, dy) {
    const newX = playerPosition.x + dx;
    const newY = playerPosition.y + dy;
  
    // Check boundaries
    if (
      newX < 0 ||
      newY < 0 ||
      newX >= mazeLayout[0].length ||
      newY >= mazeLayout.length
    ) {
      return; // Out of bounds
    }
  
    const targetCell = mazeLayout[newY][newX];
  
    // Check for walls
    if (targetCell === 'W') return;
  
    // Update player position
    const currentCellDiv = document.querySelector(
      `.maze-cell[data-x="${playerPosition.x}"][data-y="${playerPosition.y}"]`
    );
    
    currentCellDiv.innerHTML = ''; // Remove player from current cell
  
    const newCellDiv = document.querySelector(
      `.maze-cell[data-x="${newX}"][data-y="${newY}"]`
    );
    
    newCellDiv.innerHTML = '<span class="player">❤️</span>'; // Add player to new cell
  
    playerPosition.x = newX;
    playerPosition.y = newY;
  
    // Check if the player reached the end
    if (targetCell === 'E') {
      setTimeout(() => {
        alert('Congratulations! You completed the maze! 🎉');
        document.getElementById('maze-section').classList.add('hidden');
        document.getElementById('final-message').classList.remove('hidden');
      }, 100);
    }
  }
  
  // Handle Arrow Key Movement
  document.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowUp':
        movePlayer(0, -1);
        break;
      case 'ArrowDown':
        movePlayer(0, 1);
        break;
      case 'ArrowLeft':
        movePlayer(-1, 0);
        break;
      case 'ArrowRight':
        movePlayer(1, 0);
        break;
      default:
        break;
    }
  });
  
  // Initialize Maze on Page Load
  generateMaze();
  
  
  // Final Surprise
  document.getElementById('yes-btn').addEventListener('click', () => {
    const response = document.getElementById('response');
  
    response.classList.remove('hidden');
    
    response.innerHTML = `
      <h2>YESSSSSS!!! ❤️❤️❤️</h2>
      <h3>FOOOOKKKKK YEAHHHHHHHHHHHH 🦾💦💕</h3>
    `;
  
    confetti(); // Trigger confetti effect
    floatingHearts(); // Trigger floating hearts animation
  
    // Bounce animation for the cat image
    document.getElementById('cat-container').style.animation = 'bounce 3s ease-in-out infinite';
  });
  
  document.getElementById('no-btn').addEventListener('click', () => {
    const response = document.getElementById('response');
  
    response.classList.remove('hidden');
    
    response.innerHTML = `<h2>CONGRATS, you are friend-zoned 😒</h2>`;
  });
  
  // Confetti Effect
  function confetti() {
    const colors = ['#ff6f61', '#fad0c4', '#fff176', '#9b59b6', '#3498db'];
    
    for (let i = 0; i < 150; i++) {
      const confetti = document.createElement('div');
      
      confetti.style.position = 'absolute';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.top = `${Math.random() * window.innerHeight}px`;
      confetti.style.left = `${Math.random() * window.innerWidth}px`;
      
      document.body.appendChild(confetti);
      
      confetti.style.animation = `confetti-fall ${Math.random() * 4 + 2}s linear infinite`;
  
      setTimeout(() => confetti.remove(), 4000);
    }
  }
  
  // Floating Hearts Effect
  function floatingHearts() {
    setInterval(() => {
      const heart = document.createElement('div');
      
      heart.textContent = '❤️';
      heart.style.position = 'absolute';
      heart.style.fontSize = `${Math.random() * 30 + 20}px`;
      heart.style.top = `${Math.random() * window.innerHeight}px`;
      heart.style.left = `${Math.random() * window.innerWidth}px`;
      
      heart.style.animation = `float-up ${Math.random() * 4 + 2}s linear infinite`;
      
      document.body.appendChild(heart);
  
      setTimeout(() => heart.remove(), 4000);
    }, 500);
  }
  
  // Animation for falling confetti
  const style = document.createElement('style');
  style.innerHTML = `
  @keyframes confetti-fall {
    from { transform: translateY(0) rotate(0deg); }
    to { transform: translateY(100vh) rotate(360deg); }
  }
  
  @keyframes float-up {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(-100vh); opacity: 0; }
  }
  `;
  document.head.appendChild(style);
  
// game.js

let tg = window.Telegram.WebApp;
tg.expand(); // Make the app full screen

document.addEventListener("DOMContentLoaded", () => {
  const mainMenu = document.getElementById("main-menu");
  const duelScreen = document.getElementById("duel-screen");
  const leaderboardScreen = document.getElementById("leaderboard-screen");

  const startGameBtn = document.getElementById("start-game");
  const viewRulesBtn = document.getElementById("view-rules");
  const leaderboardBtn = document.getElementById("leaderboard");
  const backToMenuBtn = document.getElementById("back-to-menu");

  const attackBtn = document.getElementById("attack-btn");
  const defendBtn = document.getElementById("defend-btn");
  const dodgeBtn = document.getElementById("dodge-btn");

  // State
  let player = { health: 100, energy: 100 };
  let opponent = { health: 100, energy: 100 };

  function updateBars() {
    document.querySelector("#player-knight .health").style.width = player.health + "%";
    document.querySelector("#player-knight .energy").style.width = player.energy + "%";
    document.querySelector("#opponent-knight .health").style.width = opponent.health + "%";
    document.querySelector("#opponent-knight .energy").style.width = opponent.energy + "%";
  }

  function startGame() {
    mainMenu.classList.add("hidden");
    duelScreen.classList.remove("hidden");
    player.health = 100;
    player.energy = 100;
    opponent.health = 100;
    opponent.energy = 100;
    updateBars();
  }

  // Player actions
  attackBtn.addEventListener("click", () => {
    opponent.health -= 10;
    player.energy -= 10;
    updateBars();
    checkWinCondition();
  });

  defendBtn.addEventListener("click", () => {
    player.energy += 5;
    updateBars();
  });

  dodgeBtn.addEventListener("click", () => {
    opponent.energy -= 5;
    updateBars();
  });

  function checkWinCondition() {
    if (opponent.health <= 0) {
      alert("You win!");
      tg.sendData(JSON.stringify({ result: "win", score: player.energy }));
      startGame(); // Restart
    }
    if (player.health <= 0) {
      alert("You lose!");
      startGame(); // Restart
    }
  }

  startGameBtn.addEventListener("click", startGame);

  // Leaderboard
  leaderboardBtn.addEventListener("click", () => {
    mainMenu.classList.add("hidden");
    leaderboardScreen.classList.remove("hidden");

    // Fetch leaderboard data
    fetch("https://api.telegram.org/bot<7845497963:AAGAo71SOwRLk7653N1ZYoizKbuXsB8h03k>/getScores")
      .then((res) => res.json())
      .then((data) => {
        const leaderboardList = document.getElementById("leaderboard-list");
        leaderboardList.innerHTML = data.result
          .map((entry) => `<p>${entry.username}: ${entry.score}</p>`)
          .join("");
      });
  });

  backToMenuBtn.addEventListener("click", () => {
    leaderboardScreen.classList.add("hidden");
    mainMenu.classList.remove("hidden");
  });
});

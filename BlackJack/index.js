let player = {
    name: "Player",
    chips: 200
  };
  let dealer = {
    name: "Dealer",
    chips: 400
  };
  let inDebt = false;
  let cards = [];
  let sum = 0;
  let hasBlackJack = false;
  let isAlive = false;
  let message = "";
  let messageEl = document.getElementById("message-el");
  let sumEl = document.getElementById("sum-el");
  let cardsEl = document.getElementById("cards-el");
  let playerEl = document.getElementById("player-el");
  let dealerEl = document.getElementById("dealer-el");
  playerEl.textContent = player.name + ": $" + player.chips;
  dealerEl.textContent = dealer.name + ": $" + dealer.chips;
  let dcards = [];
  let dsum = 0;
  let dhasBlackJack = false;
  let disAlive = false;
  let dsumEl = document.getElementById("dsum-el");
  let dcardsEl = document.getElementById("dcards-el");

  let sG = document.getElementById("sg");
  let nC = document.getElementById("nc");
  let s = document.getElementById("s");
  
  function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1;
    if (randomNumber > 10) {
      return 10;
    } else if (randomNumber === 1) {
      return 11;
    } else {
      return randomNumber;
    }
  }
  
  sG.addEventListener("click", function() {
    if (inDebt === false) {
      dcardsEl.textContent = "Dealer's Cards: ???";
      dsumEl.textContent = "Dealer's Sum: ???";
  
      isAlive = true;
      hasBlackJack = false;
      let firstCard = getRandomCard();
      let secondCard = getRandomCard();
      cards = [firstCard, secondCard];
      sum = firstCard + secondCard;
      renderGame();
    } else {
      messageEl.textContent = "._.";
    }
  } )
  
  function renderGame() {
    if (inDebt === false) {
      cardsEl.textContent = "Cards: ";
      for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " ";
      }
  
      sumEl.textContent = "Sum: " + sum;
      if (sum <= 20) {
        message = "Do you want to draw a new card?";
      } else if (sum === 21) {
        message = "You've got Blackjack!";
        hasBlackJack = true;
      } else {
        message = "You Lose!";
        stand();
      }
      messageEl.textContent = message;
    } else {
      messageEl.textContent = "._.";
    }
  }
  
  nC.addEventListener("click", function() {
    if (inDebt === false) {
      if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard();
        sum += card;
        cards.push(card);
        renderGame();
      }
    } else {
      messageEl.textContent = "._.";
    }
  }) 
  function renderd() {
    let dfirstCard = getRandomCard();
    let dsecondCard = getRandomCard();
    dcards = [dfirstCard, dsecondCard];
    dsum = dfirstCard + dsecondCard;
  
    dcardsEl.textContent = "Dealer's Cards: ";
    for (let o = 0; o < dcards.length; o++) {
      dcardsEl.textContent += dcards[o] + " ";
    }
  
    dsumEl.textContent = "Dealer's Sum: " + dsum;
  }
  
  s.addEventListener( "click", function() {
    if (isAlive === true) {
      renderd();
      if (sum === dsum) {
        messageEl.textContent = "Its a tie";
      } else if (sum < dsum || sum > 21) {
        messageEl.textContent = "You Lose!";
        dealer.chips += 50;
        dealerEl.textContent = dealer.name + ": $" + dealer.chips;
        player.chips -= 50;
        playerEl.textContent = player.name + ": $" + player.chips;
        isAlive = false;
      } else {
        isAlive = false;
        messageEl.textContent = "YOU WIN";
        dealer.chips -= 50;
        dealerEl.textContent = dealer.name + ": $" + dealer.chips;
        player.chips += 50;
        playerEl.textContent = player.name + ": $" + player.chips;
      }
      if (player.chips < 0) {
        messageEl.textContent = "You're in Debt :(";
        inDebt = true;
      } else if (dealer.chips < 0) {
        messageEl.textContent = "The Dealer is in Dept to YOU :D";
        inDebt = true;
      }
    } else {
      messageEl.textContent = "._.";
    }
  }
  )
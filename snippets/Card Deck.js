const cardDeck = {
  suits: ["♠", "♥", "♦", "♣"],
  court: ["J", "Q", "K", "A"],
  
  // The generator function that makes the object iterable
  [Symbol.iterator]: function* () {
    for (let suit of this.suits) {
      // 1. Yield numbers 2 through 10
      for (let i = 2; i <= 10; i++) {
        yield suit + i;
      }
      // 2. Yield court cards J, Q, K, A
      for (let c of this.court) {
        yield suit + c;
      }
    }
  }
};

// Running the code using a for...of loop
for (let card of cardDeck) {
  console.log(card);
}
const allCards = [...cardDeck];
console.log(allCards); 
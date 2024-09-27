const vocabList = [
    { word: "Haus", translation: "House" },
    { word: "Baum", translation: "Tree" },
    { word: "Auto", translation: "Car" },
    { word: "Buch", translation: "Book" }
];

let currentCardIndex = 0;

function displayCard() {
    const flashcardsContainer = document.getElementById("flashcards-container");
    flashcardsContainer.innerHTML = `
        <div class="flashcard" id="flashcard">
            <div class="front">
                <strong>${vocabList[currentCardIndex].word}</strong>
            </div>
            <div class="back">
                ${vocabList[currentCardIndex].translation}
            </div>
        </div>
    `;

    const flashcard = document.getElementById("flashcard");
    flashcard.addEventListener("click", () => {
        flashcard.classList.toggle("is-flipped");
    });
}

document.getElementById("next-card").addEventListener("click", () => {
    currentCardIndex = (currentCardIndex + 1) % vocabList.length;
    displayCard();
});

// Initiales Laden der ersten Karte
displayCard();

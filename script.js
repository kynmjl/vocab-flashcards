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
        <div>
            <strong>${vocabList[currentCardIndex].word}</strong><br>
            ${vocabList[currentCardIndex].translation}
        </div>
    `;
}

document.getElementById("next-card").addEventListener("click", () => {
    currentCardIndex = (currentCardIndex + 1) % vocabList.length;
    displayCard();
});

// Initiales Laden der ersten Karte
displayCard();

const vocabSets = {
    "Set 1": [
        { word: "Haus", translation: "House" },
        { word: "Baum", translation: "Tree" },
    ],
    "Set 2": [
        { word: "Auto", translation: "Car" },
        { word: "Buch", translation: "Book" },
    ]
};

let currentSet = "Set 1"; // Standardmäßig erstes Set
let currentCardIndex = 0;

function displayCard() {
    const flashcardsContainer = document.getElementById("flashcards-container");
    const currentVocabList = vocabSets[currentSet];
    flashcardsContainer.innerHTML = `
        <div class="flashcard" id="flashcard">
            <div class="front">
                <strong>${currentVocabList[currentCardIndex].word}</strong>
            </div>
            <div class="back">
                ${currentVocabList[currentCardIndex].translation}
            </div>
        </div>
    `;

    const flashcard = document.getElementById("flashcard");
    flashcard.addEventListener("click", () => {
        flashcard.classList.toggle("is-flipped");
    });
}

function changeSet(newSet) {
    currentSet = newSet;
    currentCardIndex = 0; // Beim Wechseln zum neuen Set die erste Karte anzeigen
    displayCard();
}

document.getElementById("next-card").addEventListener("click", () => {
    const currentVocabList = vocabSets[currentSet];
    currentCardIndex = (currentCardIndex + 1) % currentVocabList.length;
    displayCard();
});

// Initiales Laden der ersten Karte
displayCard();

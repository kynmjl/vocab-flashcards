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


// Event-Listener für das Erstellen eines neuen Sets
document.getElementById("new-set-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const newSetName = document.getElementById("new-set-name").value;
    if (!vocabSets[newSetName]) {
        vocabSets[newSetName] = [];
        const setSelector = document.getElementById("set-selector");
        const newOption = document.createElement("option");
        newOption.value = newSetName;
        newOption.text = newSetName;
        setSelector.add(newOption);
        alert(`Neues Set "${newSetName}" wurde erstellt!`);
    }
});

// Event-Listener für das Hinzufügen neuer Wörter
document.getElementById("new-word-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const word = document.getElementById("word").value;
    const translation = document.getElementById("translation").value;
    const selectedSet = document.getElementById("set-selection").value;

    if (vocabSets[selectedSet]) {
        vocabSets[selectedSet].push({ word, translation });
        alert(`"${word}" wurde zum Set "${selectedSet}" hinzugefügt!`);
    }
});


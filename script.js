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



function showSection(section) {
    document.getElementById('lernen-section').style.display = 'none';
    document.getElementById('vokabeln-section').style.display = 'none';
    
    if (section === 'lernen') {
        document.getElementById('lernen-section').style.display = 'block';
        populateSetSelector('learn-set-selector');
    } else if (section === 'vokabeln') {
        document.getElementById('vokabeln-section').style.display = 'block';
        populateSetSelector('vocab-set-selector');
    }
}

function populateSetSelector(selectorId) {
    const setSelector = document.getElementById(selectorId);
    setSelector.innerHTML = '<option value="">Kartenset auswählen</option>'; // Zurücksetzen
    for (const setName in vocabSets) {
        const option = document.createElement('option');
        option.value = setName;
        option.text = setName;
        setSelector.add(option);
    }
}


function changeSetForLearning(newSet) {
    if (newSet) {
        currentSet = newSet;
        currentCardIndex = 0;
        displayCard();
        document.getElementById('next-card').style.display = 'block'; // Zeigt den "Nächste Karte"-Button an
    } else {
        document.getElementById('next-card').style.display = 'none';
    }
}


function showWordsInSet(setName) {
    const wordList = document.getElementById("word-list");
    wordList.innerHTML = ""; // Leert die Liste
    
    if (setName && vocabSets[setName]) {
        vocabSets[setName].forEach((vocab, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${vocab.word} - ${vocab.translation} <button onclick="editWord('${setName}', ${index})">Bearbeiten</button>`;
            wordList.appendChild(li);
        });
    }
}

function editWord(setName, wordIndex) {
    const word = prompt("Neues Wort eingeben:", vocabSets[setName][wordIndex].word);
    const translation = prompt("Neue Übersetzung eingeben:", vocabSets[setName][wordIndex].translation);
    if (word && translation) {
        vocabSets[setName][wordIndex] = { word, translation };
        showWordsInSet(setName); // Aktualisiert die Liste
    }
}

// Event-Listener für das Hinzufügen neuer Wörter
document.getElementById("new-word-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const word = document.getElementById("new-word").value;
    const translation = document.getElementById("new-translation").value;
    const selectedSet = document.getElementById("vocab-set-selector").value;

    if (vocabSets[selectedSet]) {
        vocabSets[selectedSet].push({ word, translation });
        alert(`"${word}" wurde zum Set "${selectedSet}" hinzugefügt!`);
        showWordsInSet(selectedSet); // Aktualisiert die Liste nach Hinzufügen
    }
});



let cardsField = document.getElementById('cards');
let resetBlock = document.getElementById('reset');
let resetBtn = document.getElementById('reset-btn');
let countCards = 16;
let delCards = 0;
let pause = false;

let images = [];
let selCards = [];

function shuffle(array) {
	let currentIndex = array.length, temporaryValue, randomIndex;
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

// Push images to array and double them
for (let i = 1; i <= 8; i += 1) {
	images.push(i);
	images.push(i);
}

// Shuffle images
shuffle(images);

// Create list items for each card
for (let i = 0; i < countCards; i++) {
	let li = document.createElement('li');
	li.id = i;
	cardsField.appendChild(li);
}

// Handle click event on cards
cardsField.onclick = function (event) {
	if (pause == false) {
		let card = event.target;
		// If the clicked item is a list item
		if (card.tagName == 'LI' && card.className != 'active') {
			// Push the card to the selected array
			selCards.push(card);
			card.className = 'active';
			// Get the image number
			let img = images[card.id];
			// Set the background image of the card
			card.style.backgroundImage = `url(images/${img}.png)`;
			// If two cards are selected
			if (selCards.length == 2) {
				pause = true;
				if (images[selCards[0].id] == images[selCards[1].id]) {
					selCards.forEach(card => card.style.visibility = 'hidden');
					delCards += 2;
				}
				setTimeout(refreshCards, 600);
			}
		}
	}
}

function refreshCards() {
	for (let i = 0; i < countCards; i++) {
		cardsField.children[i].className = '';
		cardsField.children[i].style.backgroundImage = 'url("images/back.png")'
	}
	if (delCards == countCards) {
		resetBlock.style.display = 'block';
	}
	selCards = [];
	pause = false;
}

resetBtn.onclick = function () {
	location.reload();
}
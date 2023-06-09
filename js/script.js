let cardsField = document.getElementById('cards');
let resetBlock = document.getElementById('reset');
let resetOverlay = document.querySelector('.overlay');
let resetBtn = document.getElementById('reset-btn');
let lvl1 = document.getElementById('btn-1');
let lvl2 = document.getElementById('btn-2');
let lvl3 = document.getElementById('btn-3');

let countCards = 16;
let delCards = 0;
let pause = false;
let n = 8;
let x = 4;
let y = 4;
let images = [];
let selCards = [];

fillCards(n);
createCards();

function fillCards(n) {
	// Push images to array and double them
	for (let i = 1; i <= n; i += 1) {
		images.push(i, i);
	}
	// Shuffle images
	shuffle(images);
}

function createCards() {
	for (let i = 0; i < countCards; i++) {
		let li = document.createElement('li');
		if (window.innerWidth <= 500) {
			li.style.height = '3.5rem';
			li.style.width = '3.5rem';
		}
		li.id = i;
		cardsField.appendChild(li);
	}
}

function setLevel(lvl) {
	let activeClass = 'active';
	switch (lvl) {
		case 1:
			lvl1.classList.add(activeClass);
			lvl2.classList.remove(activeClass);
			lvl3.classList.remove(activeClass);
			countCards = 16;
			x = 4;
			y = 4;
			n = 8;
			break;
		case 2:
			lvl1.classList.remove(activeClass);
			lvl2.classList.add(activeClass);
			lvl3.classList.remove(activeClass);
			countCards = 36;
			x = 6;
			y = 6;
			n = 18
			break;
		case 3:
			lvl1.classList.remove(activeClass);
			lvl2.classList.remove(activeClass);
			lvl3.classList.add(activeClass);
			countCards = 54;
			if (window.innerWidth <= 768) {
				x = 6;
				y = 9;
			} else {
				x = 9;
				y = 6;
			}
			n = 27
			break;
	}
	cardsField.innerHTML = '';
	images = [];
	cardsField.style.gridTemplate = `repeat(${y}, auto) / repeat(${x}, auto)`;
	fillCards(n);
	createCards();
}

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
			card.style.backgroundImage = `url(img/${img}.png)`;
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
		cardsField.children[i].style.backgroundImage = 'url("img/back.png")'
	}
	if (delCards == countCards) {
		resetOverlay.style.display = 'block';
		resetBlock.style.display = 'block';
	}
	selCards = [];
	pause = false;
}

resetBtn.onclick = function () {
	location.reload();
}
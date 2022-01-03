// LANDING AND NAVBAR
const landingBars = Array.from(document.getElementsByClassName('bar'));

const assignColorAnimation = (el, duration) => {  //assigns random color to landing bar
	const colorArr = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5']; 
	let chosenColor, glow, star;
	chosenColor = Math.floor(Math.random() * colorArr.length); //random array index
	let starColor = 'star-' + colorArr[chosenColor];
	glow = document.createElement('div');
	star = document.createElement('div');
	glow.classList.add('glow', colorArr[chosenColor]);
	glow.style.animation = `move-left ${duration}ms ease-in forwards infinite`;
	star.classList.add('star', starColor);
	el.appendChild(glow);
	el.appendChild(star);
};

const removeAllChildren = (el) => {
	while (el.firstChild) {
		el.removeChild(el.firstChild);
	}
};

landingBars.forEach((bar) => {   //changes landing bar color and animation duration after each loop
	(function loop() {
		removeAllChildren(bar);
		let duration;
		duration = Math.round(Math.random() * 5000 + 5000);
		assignColorAnimation(bar, duration);
		setTimeout(() => {
			loop();
		}, duration);
	})();
});

const addActiveClass = (el) => {
	el.classList.toggle('nav-button-active');
};

const scrollToSection = (el) => {
	const section = document.getElementById(el);
	window.scrollTo({
		top: section.offsetTop,
		behavior: 'smooth',
	});
};

window.onscroll = () => {       //changes nav bar highlighted section 
	const sections = document.querySelectorAll('section');
	const navLi = document.querySelectorAll('button.nav-button');
	let current;
	sections.forEach((section) => {
		const sectionTop = section.offsetTop;
		if (pageYOffset >= sectionTop) {
			current = section.getAttribute('id');
		}
	});

	navLi.forEach((li) => {
		if (li.innerText == current) li.classList.add('nav-button-active');
		if (li.innerText != current) li.classList.remove('nav-button-active');
	});
};
const navItems = Array.from(document.getElementsByClassName('nav-button'));

navItems.forEach((li) => {
	li.addEventListener('click', () => {
		scrollToSection(li.innerText);
	});
});

// SKILLS SECTION

const scrollNextArrow = document.getElementById('right-side-arrow');
const scrollPrevArrow = document.getElementById('left-side-arrow');
const skillCards = Array.from(document.getElementsByClassName('skill-card-header'));
const skillItems = Array.from(document.getElementsByClassName('skill-li'));

const showCard = (el) => { //when button is clicked, hide all cards that don't match button text
	skillCards.forEach((card) => {
		card.textContent == el.textContent
			? card.parentNode.classList.remove('hidden')
			: card.parentNode.classList.add('hidden');
	});
	skillItems.forEach((li) => {
		if (li.innerText == el.innerText) {
			li.classList.add('active-skill');
			li.nextSibling.classList.add('active-triangle-li');
		} else {
			li.classList.remove('active-skill');
			li.nextSibling.classList.remove('active-triangle-li');
		}
	});
};

const currentEl = () => {
	let current;
	skillItems.forEach((li, index) => {
		if (li.classList.contains('active-skill')) current = li;
	});
	return current;
};

const scrollNext = (el, arr) => {  
	let next = el.nextElementSibling?.nextElementSibling;
	next ? showCard(next) : showCard(skillItems[0]); 
};
const scrollPrev = (el) => {
	let prev = el.previousElementSibling?.previousElementSibling;
	prev ? showCard(prev) : showCard(skillItems[skillItems.length - 1]);
};

skillItems.forEach((li) => {
	li.addEventListener('click', () => {
		showCard(li);
	});
});
scrollNextArrow.addEventListener('click', () => {
	scrollNext(currentEl());
});
scrollPrevArrow.addEventListener('click', () => {
	scrollPrev(currentEl());
});

// SAMPLE WORK SECTION

const displayCards = Array.from(document.getElementsByClassName('work-display-card'));
const positionCards = Array.from(document.getElementsByClassName('position-card'));
const workSelectors = Array.from(document.getElementsByClassName('work-selector'));
const positionWrapper = document.getElementById('position-card-wrapper');
const displayWrapper = document.getElementById('display-card-wrapper');
const quoters = Array.from(document.getElementsByClassName('quoter'));
const quotes = Array.from(document.getElementsByClassName('quote'));

const showSelection = (el) => {   //when button is clicked, hide all cards that don't match button text
	if (el.innerText == 'Show All') {
		showAllCards();
		animatePosition(displayCards, 0);  //animate flexbox positioning by tying visible absolutely-positioned elements to hidden flexbox items 
	} else {
		displayCards.forEach((card, index) => {
			let selection = el.innerText;
			card.classList.contains(selection)
				? card.classList.remove('hidden-card')
				: card.classList.add('hidden-card');
			let positionCard = positionCards[index];
			positionCard.classList.contains(selection)
				? positionCard.classList.remove('hidden-card')
				: positionCard.classList.add('hidden-card');
		});
		animatePosition(displayCards, 0);
	}
};

const getCoords = (el) => { //get number of px from top of document 
	let box = el.getBoundingClientRect();
	return {
		top: box.top + window.pageYOffset,
		right: box.right + window.pageXOffset,
		bottom: box.bottom + window.pageYOffset,
		left: box.left + window.pageXOffset,
	};
};

const showAllCards = () => {
	displayCards.forEach((el) => {
		el.classList.remove('hidden-card');
	});
	positionCards.forEach((el) => {
		el.classList.remove('hidden-card');
	});
	animatePosition(displayCards, 0);
};

const resizeEl = (elToSize, refEl) => {
	elToSize.style.height = refEl.offsetHeight + 'px';
	elToSize.style.width = refEl.offsetWidth + 'px';
};

const alignElems = (elemToMove, refElem, offset) => {
	const newCoords = getCoords(refElem);
	resizeEl(elemToMove, refElem);
	elemToMove.style.left = newCoords.left + 'px';
	if (!offset) {
		elemToMove.style.top = newCoords.top + 'px';
	} else {
		elemToMove.style.top = refElem.offsetTop + 'px';
	}
};

const animatePosition = (arr, delay) => {
	setTimeout(() => {  
		arr.forEach((item, index) => {
			alignElems(item, positionCards[index], true);
		});
	}, delay);
	alignElems(displayWrapper, positionWrapper);
};

workSelectors.forEach((sel) => {
	sel.addEventListener('click', function () {
		showSelection(sel);
	});
});

window.addEventListener('resize', function () {
	animatePosition(displayCards, 500); //add delay to animation so it doesn't fire excessively 
});
document.getElementById('position-card-wrapper').addEventListener('scroll', function () {
	animatePosition(displayCards, 500);
});

const slideQuotes = (arr, delay, faster) => {
	const arrLength = arr.length;
	let activeArrIndex = 0;

	setInterval(() => {
		let activeEl = arr[activeArrIndex];  //for tracking index position
		arr.indexOf(activeEl) == arrLength - 1 ? (activeArrIndex = 0) : activeArrIndex++;
		faster ? activeEl.classList.remove('slideInFaster') : activeEl.classList.remove('slideIn');
		activeEl.classList.add('slideAway');
		faster
			? arr[activeArrIndex].classList.add('slideInFaster')
			: arr[activeArrIndex].classList.add('slideIn');
		arr[activeArrIndex].classList.remove('slideAway');
	}, delay);
};

//CONTACT SECTION

const postMessage = async (url = '', data = {}) => {
	const req = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then((res) => res.json())
		.then((data) => {
			console.log('success: ', data);
		})
		.catch((err) => {
			console.error('error: ', err);
		});
};

const sendMessage = () => {
	const name = document.getElementById('name');
	const email = document.getElementById('email');
	const contactMessage = document.getElementById('message-input');
	const resMessage = document.getElementById('res-message');
	const topic = document.getElementById('topic');
	if (name.value && email.value && contactMessage.value) {
		const data = {
			name: name.value,
			email: email.value,
			message: contactMessage.value,
			topic: topic.value,
		};

		postMessage('https://www.daigleportfolio.me/sendmessage', data);
		name.value = '';
		email.value = '';
		contactMessage.value = '';
		resMessage.innerText = 'Success! Message Sent. Expect a reply within 24 hours';
	} else {
		resMessage.innerText = 'Whoops! Required fields empty';
	}
};



function createRipple(event) {
	const button = event.currentTarget;
	const circle = document.createElement('span');
	const diameter = Math.max(button.clientWidth, button.clientHeight);
	const radius = diameter / 2;
	const origin = getCoords(button);
	const topValue = event.clientY - (origin.top - window.pageYOffset);
	const leftValue = event.clientX - (origin.left - window.pageXOffset);
	circle.style.width = circle.style.height = `${diameter}px`;
	circle.style.left = `${leftValue - radius}px`;
	circle.style.top = `${topValue - radius}px`;
	circle.classList.add('ripple');
	const ripple = button.getElementsByClassName('ripple')[0];

	if (ripple) {
		ripple.remove();
	}

	button.appendChild(circle);
}

const buttons = document.getElementsByTagName('button');
for (const button of buttons) {
	button.addEventListener('click', createRipple);
}

const sendMessageButton = document.getElementById('send-message-button');
sendMessageButton.addEventListener('click', sendMessage);

window.onload = function () {
	animatePosition(displayCards, 0);
	slideQuotes(quotes, 4000, false);
	setTimeout(() => {
		slideQuotes(quoters, 4000, true);
	}, 50);
	alignElems(displayWrapper, positionWrapper);
};
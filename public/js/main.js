console.log('connected');

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

window.onscroll = () => {
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
const skillCards = Array.from(document.getElementsByClassName('skill-card-header'));
const showCard = (el) => {
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

const navItems = Array.from(document.getElementsByClassName('nav-button'));
navItems.forEach((li) => {
	li.addEventListener('click', () => {
		scrollToSection(li.innerText);
	});
});

const skillItems = Array.from(document.getElementsByClassName('skill-li'));
skillItems.forEach((li) => {
	li.addEventListener('click', () => {
		showCard(li);
	});
});

const currentEl = () => {
	let current;
	skillItems.forEach((li, index) => {
		if (li.classList.contains('active-skill')) current = li;
	});
	return current;
};

const scrollNextArrow = document.getElementById('right-side-arrow');
const scrollPrevArrow = document.getElementById('left-side-arrow');
const scrollNext = (el, arr) => {
	let next = el.nextElementSibling?.nextElementSibling;
	next ? showCard(next) : showCard(skillItems[0]);
};
const scrollPrev = (el) => {
	let prev = el.previousElementSibling?.previousElementSibling;
	prev ? showCard(prev) : showCard(skillItems[skillItems.length - 1]);
};
scrollNextArrow.addEventListener('click', () => {
	scrollNext(currentEl());
});
scrollPrevArrow.addEventListener('click', () => {
	scrollPrev(currentEl());
});

const displayCards = Array.from(document.getElementsByClassName('work-display-card'));
const positionCards = Array.from(document.getElementsByClassName('position-card'));

const showSelection = (el) => {
	if (el.innerText == 'Show All') {
		showAllCards();
		animatePosition(displayCards, 0);
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

const workSelectors = Array.from(document.getElementsByClassName('work-selector'));
workSelectors.forEach((sel) => {
	sel.addEventListener('click', function () {
		showSelection(sel);
	});
});

const getCoords = (el) => {
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

let positionWrapper = document.getElementById('position-card-wrapper');
let displayWrapper = document.getElementById('display-card-wrapper');

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

window.addEventListener('resize', function () {
	animatePosition(displayCards, 500);
});
document.getElementById('position-card-wrapper').addEventListener('scroll', function () {
	animatePosition(displayCards, 500);
});

const quoters = Array.from(document.getElementsByClassName('quoter'));
const quotes = Array.from(document.getElementsByClassName('quote'));

const slideQuotes = (arr, delay, faster) => {
	const arrLength = arr.length;
	let activeArrIndex = 0;

	setInterval(() => {
		let activeEl = arr[activeArrIndex];
		arr.indexOf(activeEl) == arrLength - 1 ? (activeArrIndex = 0) : activeArrIndex++;
		faster ? activeEl.classList.remove('slideInFaster') : activeEl.classList.remove('slideIn');
		activeEl.classList.add('slideAway');
		faster
			? arr[activeArrIndex].classList.add('slideInFaster')
			: arr[activeArrIndex].classList.add('slideIn');
		arr[activeArrIndex].classList.remove('slideAway');
	}, delay);
};
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

		postMessage('https://portfolio-mqlie.run-us-west2.goorm.io/sendmessage', data);
		name.value = '';
		email.value = '';
		contactMessage.value = '';
		resMessage.innerText = 'Success! Message Sent. Expect a reply within 24 hours';
	} else {
		resMessage.innerText = 'Whoops! Required fields empty';
	}
};

document.getElementById('send-message-button').addEventListener('click', function () {
	sendMessage();
});

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

const landingBars = Array.from(document.getElementsByClassName('bar'));


const assignColorAnimation = (arr, duration) => {
	const colorArr = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5'];
		let chosenColor, glow, star;
		chosenColor = Math.floor(Math.random() * colorArr.length);
		let starColor = 'star-' + colorArr[chosenColor];
		glow = document.createElement('div');
		star = document.createElement('div');
		glow.classList.add("glow",colorArr[chosenColor]);
		glow.style.animation = `move-left ${duration}ms ease-in forwards infinite`;
		star.classList.add("star",starColor);
		arr.appendChild(glow);
		arr.appendChild(star);
};

const removeAllChildren = (el) => {
	while (el.firstChild) {
		el.removeChild(el.firstChild);
	}
}
landingBars.forEach((bar)=>{
	
(function loop() {
	removeAllChildren(bar);
	let duration;
	duration = Math.round(Math.random() * 5000 + 5000);
	assignColorAnimation(bar, duration);
	setTimeout(() => {
		loop();
	}, duration);
})();
})

window.onload = function () {
	animatePosition(displayCards, 0);
	slideQuotes(quotes, 4000, false);
	setTimeout(() => {
		slideQuotes(quoters, 4000, true);
	}, 50);
	alignElems(displayWrapper, positionWrapper);
};
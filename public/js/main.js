const canvas = document.getElementById('starry-background');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth; // sets canvas dimensions to window
canvas.height = window.innerHeight;

const width = canvas.width; //define borders for stars
const height = canvas.height;

const randomSign = () => {
	return Math.random() >= 0.05 ? 1 : -1;
};

function getRandomInt(max) {
	//to generate random star size
	return Math.floor(Math.random() * max + 1);
}

ctx.fillStyle = 'white'; //because of lack of refraction
ctx.shadowOffsetX = 1;
ctx.shadowOffsetY = 1;
ctx.shadowBlur = 3;

const numberOfStars = 350;
const stars = [];
const starSpeed = 0.05 * canvas.width;
const xv = starSpeed * randomSign() * Math.random();
const yv = Math.sqrt(Math.pow(starSpeed, 2) - Math.pow(xv, 2)) * randomSign();

for (let i = 0; i < numberOfStars; i++) {
	stars[i] = {
		r: getRandomInt(3),
		x: Math.floor(Math.random() * width),
		y: Math.floor(Math.random() * height),
		xv: xv,
		yv: yv,
	};
}

let timeDelta,
	timeLast = 0;
const loop = (timeNow) => {
	timeDelta = timeNow - timeLast;
	timeLast = timeNow;
	ctx.clearRect(0,0,width, height);
	for (let i = 0; i < stars.length; i++) {
		ctx.beginPath();
		ctx.fillRect(stars[i].x, stars[i].y, stars[i].r, stars[i].r);
		stars[i].x += stars[i].xv * timeDelta * 0.001;
		stars[i].y += stars[i].yv * timeDelta * 0.001;
	}
	
	requestAnimationFrame(loop);
	
};
requestAnimationFrame(loop);
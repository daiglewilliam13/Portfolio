const canvas = document.getElementById('starry-background');
const ctx = canvas.getContext('2d');

	canvas.width = window.innerWidth*3; // sets canvas dimensions to three times brower window to prevent scaling issues when the browswer is resized
	canvas.height = window.innerHeight*3;
	let width = canvas.width; //define borders for stars
	let height = canvas.height;

// window.addEventListener('resize', function(){
// 	canvas.width = window.innerWidth; // sets canvas dimensions to window
// 	canvas.height = window.innerHeight;
// 	let width = canvas.width; //define borders for stars
// let height = canvas.height;
// });



const randomSign = () => {
	return Math.random() >= 0.05 ? 1 : -1;
};

function getRandomInt(max) {
	//to generate random star size
	return Math.floor(Math.random() * max + 1);
}



const numberOfStars = 5000;
const stars = [];
const starSpeed = 0.05 * canvas.width;
const xv = starSpeed * randomSign() * Math.random(); // make stars move same direction
const yv = Math.sqrt(Math.pow(starSpeed, 2) - Math.pow(xv, 2)) * randomSign(); //pythagorean theorem to calculate y speed

for (let i = 0; i < numberOfStars; i++) { //generate stars to display
	let speedMult = Math.random() * .6 + .05; //changes the multiplier for star speed
	stars[i] = {
		r: getRandomInt(3), //generates a random radius from 1-3 px
		x: Math.floor(Math.random() * width),
		y: Math.floor(Math.random() * height),
		xv: xv * speedMult,
		yv: yv * speedMult
	};
}

let timeDelta,
	timeLast = 0;
const loop = (timeNow) => { //animation loop
	timeDelta = timeNow - timeLast;
	timeLast = timeNow;
	ctx.clearRect(0, 0, width, height);//clear screen before redraw
	ctx.fillStyle = 'white'; //because of lack of refraction
	ctx.shadowOffsetX = 1;
	ctx.shadowOffsetY = 1;
	ctx.shadowBlur = 3;
	for (let i = 0; i < stars.length; i++) {

		ctx.fillRect(stars[i].x, stars[i].y, stars[i].r, stars[i].r);
		stars[i].x += stars[i].xv * timeDelta * 0.001; //update x position
		stars[i].y += stars[i].yv * timeDelta * 0.001; //update y position
		if (stars[i].x < 0 - stars[i].r) {
			//reposition stars when they move off screen
			stars[i].x = width + stars[i].r;
		} else if (stars[i].x > width + stars[i].r) {
			stars[i].x = 0 - stars[i].r;
		}
		if (stars[i].y < 0 - stars[i].r) {
			stars[i].y = height + stars[i].r;
		} else if (stars[i].y > height + stars[i].r) {
			stars[i].y = 0 - stars[i].r;
		}
	}
	requestAnimationFrame(loop);
};
requestAnimationFrame(loop);
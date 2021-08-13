const canvas = document.getElementById('starry-background');
const ctx = canvas.getContext('2d');



canvas.width = window.innerWidth; // sets canvas dimensions to window 
canvas.height = window.innerHeight;

const width = canvas.width; //define borders for stars
const height = canvas.height;


function getRandomNumber(min, max) { //generates random position 
    
  return Math.random() * (max - min) + min; 
}

const smallStar = 250; //different size stars, for depth
const medStar = 150;
const largeStar = 50;

ctx.fillStyle = "white"; //because of lack of refraction
ctx.shadowOffsetX = 1;
ctx.shadowOffsetY = 1;
ctx.shadowBlur = 3;

for(i=0; i<smallStar; i++){
  posx = getRandomNumber(0, width);
  posy = getRandomNumber(0, height);
  ctx.fillRect(posx, posy, 1, 1); 
}

for(i=0; i<medStar; i++){
  posx = getRandomNumber(0, width);
  posy = getRandomNumber(0, height);
  ctx.fillRect(posx, posy, 2, 2); 
}

for(i=0; i<largeStar; i++){
  posx = getRandomNumber(0, width);
  posy = getRandomNumber(0, height);
  ctx.fillRect(posx, posy, 3, 3); 
}


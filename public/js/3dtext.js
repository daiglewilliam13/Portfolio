console.log('connected');
const wrapper = document.getElementById('display-wrapper');
const fontSize = parseInt(window.getComputedStyle(wrapper, null).getPropertyValue('font-size'), 10);
let posX, posY;
const addFlag = (el) => {
	el.classList.add('remove');
}
const logKey = (e) => {
	const cleanUp = Array.from(document.getElementsByClassName('char-disp'));
	cleanUp.forEach((el)=>{
	if(el.classList.contains('remove')) el.remove();	
	})
	const char = document.createElement('div');
	char.innerText = e.key;
	char.classList.add('char-disp');
	wrapper.append(char);
	posX = Math.floor(Math.random() * (wrapper.offsetWidth - char.offsetWidth));
	posY = Math.floor(Math.random() * (wrapper.offsetHeight - char.offsetHeight));
	char.style.top = `${posY}px`;
	char.style.left = `${posX}px`;
	setTimeout(()=>{
		addFlag(char)
	},3000)
}
document.addEventListener('keydown', logKey);
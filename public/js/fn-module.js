
export const getGuessWord = (reqStr) => {
    const last5 = getLast5Inputs();
    let guessWord = [];
    last5.forEach(input => {
        guessWord.push(input.value)
    })
    if(!reqStr){
        return guessWord;
    } else {
        guessWord = guessWord.join('')
        guessWord = guessWord.toLowerCase();
        return guessWord;
    }
}
export const disableInput = (input) => {
    let oldInputs = Array.from(document.getElementsByClassName('letter-input'));
    oldInputs = oldInputs.slice(Math.max(oldInputs.length-5, 0));
    oldInputs.forEach((input) => {
        input.setAttribute('disabled', "");
    })
}
export const getLast5Inputs = () => {
    let newInputs = Array.from(document.getElementsByClassName('letter-input'));
    newInputs = newInputs.splice(newInputs.length - 5, newInputs.length)
    return newInputs;
}

export const resetInputs = () => {
    const inputs = Array.from(document.querySelectorAll('input'));
    inputs.forEach((input)=>{
        input.removeAttribute('disabled');
        input.value='';
    })
}

export const moveToNext = (e) => {
        const next = e.target.nextElementSibling
        if(e.target.value !== '' || e.key === 'ArrowRight') next?.focus();
}

export const moveToPrev = (e, funct) => {
    const prev = e.target.previousElementSibling;
    const key = e.key;
    if(key==='Backspace') {prev?.focus(); prev?.select()};
}

export const checkEnter = (e, funct) => {
    const key = e.key;
    const isLast = e.target.classList.contains('true') ? true : false;
    if (isLast && key === 'Enter') funct();
}


export const getGuessWord = () => {
    const last5 = getLast5Inputs();
    let guessWord = [];
    last5.forEach(input => {
        guessWord.push(input.value)
    })
    return guessWord;

}
export const disableInput = (input) => {
    let oldInputs = Array.from(document.getElementsByClassName('letter-input'));
    oldInputs = oldInputs.splice(0, oldInputs.length - 5);
    oldInputs.forEach((input) => {
        input.setAttribute('disabled', "");
    })
}
export const getLast5Inputs = () => {
    let newInputs = Array.from(document.getElementsByClassName('letter-input'));
    newInputs = newInputs.splice(newInputs.length - 5, newInputs.length)
    return newInputs;
}
export const checkGuess = (guess, correct) => {
    const last5 = getLast5Inputs();
    const guessStr = guess.join('');
    const corStr = correct.join('');
    if (guessStr === corStr) {
        last5.forEach((input) => {
            input.classList.add('direct-hit');
        })
        return true;
    }
    last5.forEach((input, index) => {
        if (correct.includes(input.value)) {
            if (index === correct.indexOf(input.value)) {
                input.classList.add('direct-hit')
            } else {
                input.classList.add('side-hit')
            }
        } else {
            input.classList.add('no-hit');
        }
    })
    return false;
}
export const resetInputs = () => {
    const inputs = Array.from(document.getElementsByClassName('letter-input'));
    inputs.forEach(input => {
        input.classList.remove('direct-hit');
        input.classList.remove('side-hit');
        input.classList.remove('no-hit');
        input.value = '';
        input.removeAttribute('disabled');
    })
}



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
        const prev = e.target.previousElementSibling;
        const next = e.target.nextElementSibling
        e.keyCode === 8 || e.keyCode=== 37  ? prev?.focus() : next?.focus();
}

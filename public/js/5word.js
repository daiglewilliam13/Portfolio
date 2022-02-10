'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import Input from './Input.js';
import Win from './Win.js';
import { getGuessWord, disableInput, getLast5Inputs, checkGuess, resetInputs } from './fn-module.js';
import { data } from './5-letter-words.js';
var _React = React,
    useState = _React.useState,
    useEffect = _React.useEffect;


var wordArr = data;
var correctWord = Array.from(wordArr[Math.floor(Math.random() * wordArr.length)]);
var Main = function Main() {
    var _useState = useState([]),
        _useState2 = _slicedToArray(_useState, 2),
        inputList = _useState2[0],
        setInputList = _useState2[1];

    var _useState3 = useState([]),
        _useState4 = _slicedToArray(_useState3, 2),
        wordGuess = _useState4[0],
        setWordGuess = _useState4[1];

    var _useState5 = useState(0),
        _useState6 = _slicedToArray(_useState5, 2),
        count = _useState6[0],
        setCount = _useState6[1];

    var _useState7 = useState(false),
        _useState8 = _slicedToArray(_useState7, 2),
        hasWon = _useState8[0],
        setHasWon = _useState8[1];

    var handleKeyup = function handleKeyup(e) {
        setWordGuess(getGuessWord());
    };
    var bindInputs = function bindInputs() {
        var inputs = Array.from(document.getElementsByClassName('letter-input'));
        inputs.forEach(function (input) {
            input.addEventListener('keyup', function (e) {
                handleKeyup();
                if (e.keyCode === 8) {
                    input.previousElementSibling.focus();
                } else if (input.nextElementSibling && input.nextElementSibling.nodeName === 'INPUT') {
                    input.nextElementSibling.focus();
                }
            });
        });
    };
    var handleClick = function handleClick(e) {
        var won = checkGuess(wordGuess, correctWord);
        setHasWon(won);
        setWordGuess([]);
        if (!won) {
            setInputList(inputList.concat(React.createElement(
                React.Fragment,
                null,
                React.createElement('br', null),
                React.createElement(Input, { key: inputList.length })
            )));
            setCount(function (count) {
                return count + 1;
            });
        }
    };

    var reload = function reload() {
        setInputList([]);
        setHasWon(false);
        resetInputs();
        setCount(0);
        correctWord = Array.from(wordArr[Math.floor(Math.random() * wordArr.length)]);
    };
    useEffect(function () {
        bindInputs();
        disableInput();
        console.log(correctWord);
    }, [inputList]);
    return React.createElement(
        React.Fragment,
        null,
        React.createElement(Input, null),
        inputList,
        React.createElement(
            'button',
            { onClick: handleClick, disabled: hasWon },
            '????'
        ),
        React.createElement(
            'p',
            null,
            'Number of Tries: ',
            count
        ),
        hasWon ? React.createElement(Win, { reload: reload }) : React.createElement('p', null)
    );
};

var domContainer = document.querySelector('#main-wrapper');
ReactDOM.render(React.createElement(Main, null), domContainer);
'use strict';

var _React = React,
    useEffect = _React.useEffect;


var Input = function Input() {
    return React.createElement(
        React.Fragment,
        null,
        React.createElement("input", { type: "text", className: "letter-input", maxLength: "1" }),
        React.createElement("input", { type: "text", className: "letter-input", maxLength: "1" }),
        React.createElement("input", { type: "text", className: "letter-input", maxLength: "1" }),
        React.createElement("input", { type: "text", className: "letter-input", maxLength: "1" }),
        React.createElement("input", { type: "text", className: "letter-input", maxLength: "1" })
    );
};

export default Input;
'use strict';

import { moveToNext, moveToPrev, checkEnter } from "./fn-module.js";
var Letterbox = function Letterbox(props) {
    var getClass = function getClass(letter) {
        return {
            'a': 'active',
            'd': 'direct-hit',
            's': 'side-hit',
            'n': 'no-hit'
        }[letter];
    };
    var classList = props.last + " letter-input " + getClass(props.letterStatus);
    var disabled = props.letterStatus === 'a' ? false : true;
    return React.createElement('input', { type: 'text',
        onChange: moveToNext,
        onKeyUp: moveToPrev,
        onKeyDown: function onKeyDown(e) {
            return checkEnter(e, props.handleClick);
        },
        className: classList,
        maxLength: 1,
        disabled: disabled,
        autoFocus: props.autoFocus
    });
};

export default Letterbox;
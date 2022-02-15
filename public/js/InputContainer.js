'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _React = React,
    useState = _React.useState,
    useEffect = _React.useEffect;

import Letterbox from './Letterbox.js';

var InputContainer = function InputContainer(props) {
    var _useState = useState([]),
        _useState2 = _slicedToArray(_useState, 2),
        boxArr = _useState2[0],
        setBoxArr = _useState2[1];

    var handleClick = props.handleClick;
    useEffect(function () {
        setBoxArr(props.statusArr);
    }, [props.statusArr]);
    return React.createElement(
        React.Fragment,
        null,
        React.createElement(
            'div',
            { className: 'input-wrapper' },
            boxArr.map(function (box, index) {

                return React.createElement(Letterbox, { letterStatus: box, autoFocus: index === 0, last: index === boxArr.length - 1, handleClick: handleClick });
            })
        )
    );
};

export default InputContainer;
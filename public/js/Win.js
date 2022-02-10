'use strict';

var Win = function Win(props) {
    return React.createElement(
        React.Fragment,
        null,
        React.createElement(
            "p",
            null,
            "Congratulations!"
        ),
        " ",
        React.createElement(
            "button",
            { id: "reload-button", onClick: props.reload },
            "Try Again"
        )
    );
};

export default Win;
import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "app";

window.onload = function () {
    ReactDOM.render(
        <App />,
        document.getElementById("wrapper")
    );
};

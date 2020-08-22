import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "app";

window.onload = function () {

    console.log('dd')
    

    ReactDOM.render(
        <App />,
        document.getElementById("root")
    );
};

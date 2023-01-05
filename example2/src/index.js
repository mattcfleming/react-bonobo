// import { AppRegistry } from "react-native";
import React from "react";
import App from "./App";
import { render } from "react-bonobo";

// AppRegistry.registerComponent("App", () => App);

// AppRegistry.runApplication("App", {
//   rootTag: document.getElementById("react-root")
// });

render(<App />, document.getElementById("react-root"));

import React from "react";
import ReactDOM from "react-dom";
import UserForms from "./components/UserForms";

import "./index.css";

function App() {
  return (
    <div className="App">
      <UserForms />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);





import "./App.css";


import { RoutesManger } from "./setup/routes-manger/RoutesManger.js";
import React from "react";
function App() {
  
  //react fragment is the best practice
  return (
  <React.Fragment>
    <RoutesManger></RoutesManger>
  </React.Fragment>
     
  );
}

export default App;

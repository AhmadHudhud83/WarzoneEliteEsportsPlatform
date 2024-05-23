import React from "react";
import "./App.css";
import RoutesManger from "./setup/routes-manger/RoutesManger";
import { BrowserRouter } from "react-router-dom";

function App() {
return(
  <BrowserRouter>
  <RoutesManger />
</BrowserRouter>
)
}

export default App;

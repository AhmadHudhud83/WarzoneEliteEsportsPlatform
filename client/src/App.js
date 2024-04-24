


import "./App.css";
import TournamentList from "./pages/tournament_page/TournamentList.js";


import { RoutesManger } from "./setup/routes-manger/RoutesManger.js";
import React from "react";
function App() {
  
  //react fragment is the best practice
  return (
  /*<React.Fragment>
    <RoutesManger>*/
    <TournamentList/>
   /* </RoutesManger>
   
  </React.Fragment>*/
     
  );
}

export default App;

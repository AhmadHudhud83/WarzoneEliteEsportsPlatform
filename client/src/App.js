import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Footer from "./components/Layouts/Footer/Footer";
import axios from "axios"; //INSTALLING AXIOS PACKAGE FOR API CALLING => npm i axois (in the project directory not the client***)
import SelectGame from "./pages/create_tournement_select_game/SelectGame";

function App() {
  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const [backendData, setBackendData] = useState([{}]);

  //FETCH THE BACKEND API
  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  //react fragment is the best practice
  return (
    <BrowserRouter>
      <React.Fragment>
        <Routes>
          <Route path="/">
            <Route index element={<div>Home</div>} />
            <Route path="create-tournement" element={<SelectGame />} />
          </Route>
        </Routes>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;

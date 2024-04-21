import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Layouts/Header/Header';
import './App.css';
import Footer from './components/Layouts/Footer/Footer';
import axios from 'axios' //INSTALLING AXIOS PACKAGE FOR API CALLING => npm i axois (in the project directory not the client***)
import Card from './components/Layouts/Cards/Card';

function App() {



  useEffect(() => {
    axios.get("http://localhost:5000/users").then(
      res => {
        console.log(res.data)
      }
    ).catch((e) => {
      console.log(e)
    })
  }, [])



  const [backendData, setBackendData] = useState([{}])

  //FETCH THE BACKEND API
  useEffect(() => {
    fetch("/api").then(
      response => response.json()

    ).then(
      data => {
        setBackendData(data)
      }
    )



  }, [])





  //react fragment is the best practice
  return (
    <BrowserRouter>

      <React.Fragment>
      <Header/>

        <h1>hello esports team</h1>
        <ul>
          {(typeof backendData.users === 'undefined') ? (
            <p>Loading...</p>
          ) : (
            backendData.users.map((user, i) => {
              return (<li key={i}>{user}</li>)
            })
          )}
        </ul>
        <p>press f12 to see the data from mongoDB database</p>
        <Card 
        imgSrc="https://i.ibb.co/1GFGvmk/04-21-131723.png"
        constentHead="Counter Strike"
        proimg="https://i.ibb.co/wgxRYnb/04-21-152907.png"
        proname="JD"
        date="6/8/2023"
  time="9:30"
  prize="20$"
 
        />
        
        <Footer />
      </React.Fragment>
      <Footer />

    </BrowserRouter>
  );
}

export default App;

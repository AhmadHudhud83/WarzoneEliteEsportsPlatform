
import React, { useState, useEffect } from "react";

import axios from "axios"; //INSTALLING AXIOS PACKAGE FOR API CALLING => npm i axois (in the project directory not the client***)
import Header from '../../common/Header/Header'
import Footer from '../../common/Footer/Footer'
export const Temp = ()=>{

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

      return(<React.Fragment>


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
        <Footer />
      </React.Fragment>
      <Footer />
      </React.Fragment>)
    
    
}
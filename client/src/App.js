import React , {useState,useEffect} from 'react'
import './App.css';
import axios from 'axios' //INSTALLING AXIOS PACKAGE FOR API CALLING => npm i axois (in the project directory not the client***)

function App() {
 


    useEffect(()=>{
      axios.get("http://localhost:5000/users").then(
        res=>{
          console.log(res.data)
        }
      ).catch((e)=>{
        console.log(e)
      })
    },[])

     
    
      const [backendData,setBackendData] = useState([{}])

      //FETCH THE BACKEND API
      useEffect(()=>{
        fetch("/api").then(
          response => response.json()

        ).then(
          data=>{
            setBackendData(data)
          }
        )



      },[])
      

     


        //react fragment is the best practice
  return (
   <React.Fragment>
    <h1>hello esports team</h1>
    {(typeof backendData.users==='undefined')? (
      <p>Loading...</p>
    ):  (
      backendData.users.map((user,i)=>{
       return(<p key={i}>{user}</p>) 
      })
    )}
   </React.Fragment>
  );
}

export default App;

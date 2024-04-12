import React , {useState,useEffect} from 'react'
import './App.css';
import axios from 'axios' //INSTALLING AXIOS PACKAGE FOR API CALLING => npm i axois (in the project directory not the client***)
import Header from './HomePage/Header/Header';
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
   <React.Fragment >
    <div className='container'>
    <Header>  </Header>
    <h1>hello esports team</h1>
    <ul>
    {(typeof backendData.users==='undefined')? (
      <p>Loading...</p>
    ):  (
      backendData.users.map((user,i)=>{
       return(<li key={i}>{user}</li>) 
      })
    )}
    </ul>
    <p>press f12 to see the data from mongoDB database</p>
    </div>  
   </React.Fragment>
  );
}

export default App;

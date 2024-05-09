
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import SelectGame from "../../pages/create_tournement_select_game/SelectGame";
import { Temp } from "../../pages/home_page/Temp";
import { DetailedTournamentCard } from "../../common/Detailed-Tornament-Card";
import { TournamentManagementPage } from "../../pages/tournament-management-page";
import { TournamentDashboard } from "../../pages/tournaments_dashboard";
import { TournamentSetupForm } from "../../pages/tournament_setup_form";
import DynamicForm from "../../pages/tournament_setup_form/componenets/Dynamic/DynamicForm";
import axios from "axios";


const CreateTournamentRequest = {
  type: "CREATE_TOURNAMENT",
  reqFunction: (currentFormData) => {
    axios
      .post("http://localhost:5000/api/tournaments", currentFormData)
      .then((res) => console.log(res.data))
      .catch((e) => console.error(e));
  },
  modalInfo: {
    header:"Publishing Your Tournament"
      ,
    bodyParagraphOne:
      "When you publish a tournament, players will be able to register.",
      bodyParagraphTwo: "Are you sure you want to publish the tournament?",
  },
  content: {
    paragraphOne:
      "Publishing this tournament will enable registration and allow players to join.",
    paragraphTwo:
      " By publishing you agree to our website's policy and community standards.",
  },
  requiredParam:"gameName",
  getFunction:(requiredParam,setRequiredObject,setLoading)=>{
    axios.get(`http://localhost:5000/api/tournaments/${requiredParam}`).
    then((res=>{
      console.log(res.data)
    setRequiredObject(res.data)
    setLoading(false)
    })).catch((e)=>{console.error("error , game not found",e)

    setLoading(false)
    } )
  },

}


const UpdateTournamentRequest = {
  type: "UPDATE_TOURNAMENT",
  reqFunction: (currentFormData) => {
    axios
      .post("http://localhost:5000/api/tournaments", currentFormData)
      .then((res) => console.log(res.data))
      .catch((e) => console.error(e));
  },
  modalInfo: {
    header:"Updating Your Tournament"
      ,
    bodyParagraphOne:
      "Are you sure you want to save these changes?",
      bodyParagraphTwo: "Confirm to proceed with the update.",
  },
  content: {
    paragraphOne:
      "Saving these changes will update the tournament details.",
    paragraphTwo:
      " By saving, you agree to our website's policy and community standards.",
  },
  requiredParam:"gameName",
  getFunction:(requiredParam,setRequiredObject,setLoading)=>{
    axios.get(`http://localhost:5000/api/tournaments/${requiredParam}`).
    then((res=>{
      console.log(res.data)
    setRequiredObject(res.data)
    setLoading(false)
    })).catch((e)=>{console.error("error , game not found",e)

    setLoading(false)
    } )
  },

}
export const RoutesManger = ()=>{

//<Link to="/management"> <button style={{color:"red"}}  type="button" className="ms-5 border btn btn-dark">Manage</button></Link>
return(<BrowserRouter>
    <React.Fragment>
      <Routes>
        <Route path="/">
          <Route index element={<Temp/>} />
          <Route path="select-game/" element={<SelectGame />} />
          <Route path="tournament-setup/:gameName" element={<TournamentSetupForm request={CreateTournamentRequest} > </TournamentSetupForm>}></Route>

          <Route path="detailed-tournament/:id" element={<DetailedTournamentCard/>}/>
         <Route path="detailed-tournament/:id/management" element={<TournamentManagementPage/>}/>
          <Route path="organaizer/dashboard" element={<TournamentDashboard>
            
              
          </TournamentDashboard> }/>
          <Route path="tournament-overview/:id" element={<DetailedTournamentCard/>}></Route>
         
          <Route path="*" element={<>
          
          <h1>Error 404</h1>
          
          </>} /> 
        </Route>
      </Routes>
    </React.Fragment>
  </BrowserRouter>
)


    
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import SelectGame from "../../pages/create_tournement_select_game/SelectGame";
import { Temp } from "../../pages/home_page/Temp";
import { DetailedTournamentCard } from "../../common/Detailed-Tornament-Card";
import { TournamentManagementPage } from "../../pages/tournament-management-page";
import { TournamentDashboard } from "../../pages/tournaments_dashboard";
import { ManagementButton } from "../../common/Detailed-Tornament-Card/managementButton/ManagementButton";
import SupervisorList from "../../pages/Organaizer_Pages/Supweviosrs/SupervisorsList";
import AddSupervisor from "../../pages/Organaizer_Pages/Supweviosrs/addSupervisor";
import EditeSupervisor from "../../pages/Organaizer_Pages/Supweviosrs/editeSupervisor";
import PlayerList from "../../pages/Organaizer_Pages/Players/PlayerList";
import AddPlayer from "../../pages/Organaizer_Pages/Players/addPlayer";
import EditePlayer from "../../pages/Organaizer_Pages/Players/editePlayer";
export const RoutesManger = ()=>{


return(<BrowserRouter>
    <React.Fragment>
      <Routes>
        <Route path="/">
          <Route index element={<Temp/>} />
          <Route path="create-tournament" element={<SelectGame />} />
          <Route path="organizer/supervisor/list" element={<SupervisorList/>}/>
          <Route path="organizer/supervisor/add" element={<AddSupervisor/>}/>
          <Route path="organizer/supervisor/edit/:supervisorId" element={<EditeSupervisor/>}/>

          <Route path="organizer/player/list" element={<PlayerList/>}/>
          <Route path="organizer/player/add" element={<AddPlayer/>}/>
          <Route path="organizer/player/edit/:playerId" element={<EditePlayer/>}/>

          <Route path="detailed-tournament/:id" element={<DetailedTournamentCard><ManagementButton url="management"/ ></DetailedTournamentCard>}/>
         <Route path="detailed-tournament/:id/management" element={<TournamentManagementPage></TournamentManagementPage>}/>
          <Route path="tournamentDashboard" element={<TournamentDashboard>
          
            
              
          </TournamentDashboard> }/>
          <Route path="tournament-overview/:id" element={<DetailedTournamentCard></DetailedTournamentCard>}></Route>
       
          <Route path="*" element={<>
          
          <h1>Error 404</h1>
          
          </>} /> 
        </Route>
      </Routes>
    </React.Fragment>
  </BrowserRouter>
)


    
}
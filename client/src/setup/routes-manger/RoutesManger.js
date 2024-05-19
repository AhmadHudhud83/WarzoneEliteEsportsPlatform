import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import SelectGame from "../../pages/create_tournement_select_game/SelectGame";
import { Temp } from "../../pages/home_page/Temp";
import { DetailedTournamentCard } from "../../common/Detailed-Tornament-Card";
import { TournamentManagementPage } from "../../pages/tournament-management-page";
import { TournamentDashboard } from "../../pages/tournaments_dashboard";
import SupervisorList from "../../pages/Organaizer_Pages/Supweviosrs/SupervisorsList";
import AddSupervisor from "../../pages/Organaizer_Pages/Supweviosrs/addSupervisor";
import EditeSupervisor from "../../pages/Organaizer_Pages/Supweviosrs/editeSupervisor";
import PlayerList from "../../pages/Organaizer_Pages/Players/PlayerList";
import AddPlayer from "../../pages/Organaizer_Pages/Players/addPlayer";
import EditePlayer from "../../pages/Organaizer_Pages/Players/editePlayer";
import { TournamentForm } from "../../pages/tournament_setup_form/index";
import axios from "axios";
//tournament form flag
const createTournamentRequest = "CREATE_TOURNAMENT"; //for creating tournament form handling
const updateTournamentRequest = "UPDATE_TOURNAMENT"; //for updating exisiting tournament form handling

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

          <Route path="detailed-tournament/:id" element={<DetailedTournamentCard></DetailedTournamentCard>}/>
         <Route path="detailed-tournament/:id/management" element={<TournamentManagementPage></TournamentManagementPage>}/>
          <Route path="tournamentDashboard" element={<TournamentDashboard>
           <Route path="select-game/" element={<SelectGame />}></Route>
            <Route path="select-game/tournament-setup/:gameName" element={<TournamentForm request={createTournamentRequest} />} />                                               
          
            
              
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





            {/* <Route path="organaizer/dashboard/:tournament" element={<TournamentSetupForm request={CreateTournamentRequest} />}/> */}
            <Route
              path="organaizer/dashboard/detailed-tournament/:tournamentId/management/updating-form"
              element={<TournamentForm request={updateTournamentRequest} />}
            />
            <Route
              path="detailed-tournament/:id"
              element={<DetailedTournamentCard />}
            />
            <Route
              path="detailed-tournament/:id/management"
              element={<TournamentManagementPage />}
            />
            <Route
              path="organaizer/dashboard"
              element={<TournamentDashboard></TournamentDashboard>}
            />
            <Route
              path="tournament-overview/:id"
              element={<DetailedTournamentCard />}
            ></Route>

            <Route
              path="*"
              element={
                <>
                  <h1>Error 404</h1>
                </>
              }
            />
          </Route>
        </Routes>
      </React.Fragment>
    </BrowserRouter>
  );
};

import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import SelectGame from "../../pages/create_tournement_select_game/SelectGame";
import { Temp } from "../../pages/home_page/Temp";
import { DetailedTournamentCard } from "../../common/Detailed-Tornament-Card";
import Tournaments from "../../pages/supervisor_dashboard/tournaments/Tournaments";
import Matches from "../../pages/supervisor_dashboard/matches/Matches";
import SupervisorList from "../../pages/organizer_dashboard/components/Supervisors/SupervisorsList";
import AddSupervisor from "../../pages/organizer_dashboard/components/Supervisors/addSupervisor";
import EditeSupervisor from "../../pages/organizer_dashboard/components/Supervisors/editeSupervisor";
import PlayerList from "../../pages/organizer_dashboard/components/Players/PlayerList"
import AddPlayer from "../../pages/organizer_dashboard/components/Players/addPlayer";
import EditePlayer from "../../pages/organizer_dashboard/components/Players/editePlayer";
import { OrganizerDashboard } from "../../pages/organizer_dashboard/index";
import { TournamentForm } from "../../pages/tournament_setup_form/index";

//tournament form flag
const createTournamentRequest = "CREATE_TOURNAMENT"; //for creating tournament form handling
const updateTournamentRequest = "UPDATE_TOURNAMENT"; //for updating exisiting tournament form handling

export const RoutesManger = () => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Routes>
          <Route path="/">
            <Route index element={<Temp />} />
            <Route path="create-tournament" element={<SelectGame />} />
            <Route
              path="organizer/dashboard/supervisor/list"
              element={<SupervisorList />}
            />
            <Route
              path="organizer/dashboard/supervisor/add"
              element={<AddSupervisor />}
            />
            <Route
              path="organizer/dashboard/supervisor/edit/:supervisorId"
              element={<EditeSupervisor />}
            />

            <Route path="organizer/dashboard/player/list" element={<PlayerList />} />
            <Route path="organizer/dashboard/player/add" element={<AddPlayer />} />
            <Route
              path="organizer/dashboard/player/edit/:playerId"
              element={<EditePlayer />}
            />

            <Route
              path="detailed-tournament/:id"
              element={<DetailedTournamentCard></DetailedTournamentCard>}
            />
        
            <Route path="organizer/dashboard/select-game" element={<SelectGame />}></Route>
            <Route
              path="organizer/dashboard/select-game/tournament-setup/:gameName"
              element={<TournamentForm request={createTournamentRequest} />}
            />
            <Route
              path="organizer/dashboard/management/:tournamentId"
              element={<TournamentForm request={updateTournamentRequest} />}
            />
         
          
            <Route
              path="organizer/dashboard"
              element={<OrganizerDashboard />}
            />

            <Route path="supervisor/">
              <Route index element={<h1>Login</h1>} />
              <Route path="tournaments">
                <Route index element={<Tournaments />} />
                <Route path=":id" element={<Matches />} />
              </Route>
            </Route>

            <Route
              path="tournament-overview/:id"
              element={<DetailedTournamentCard></DetailedTournamentCard>}
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

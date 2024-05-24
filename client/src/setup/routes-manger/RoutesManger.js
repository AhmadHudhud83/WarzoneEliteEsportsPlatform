import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import SelectGame from "../../pages/create_tournement_select_game/SelectGame";
import { HomePage } from "../../pages/home_page/HomePage";
import { DetailedTournamentCard } from "../../common/Detailed-Tornament-Card";
import Tournaments from "../../pages/supervisor_dashboard/tournaments/Tournaments";
import Matches from "../../pages/supervisor_dashboard/matches/Matches";
import SupervisorList from "../../pages/organizer_dashboard/components/Supervisors/SupervisorsList";
import AddSupervisor from "../../pages/organizer_dashboard/components/Supervisors/addSupervisor";
import EditeSupervisor from "../../pages/organizer_dashboard/components/Supervisors/editeSupervisor";
import PlayerList from "../../pages/organizer_dashboard/components/Players/PlayerList";
import AddPlayer from "../../pages/organizer_dashboard/components/Players/addPlayer";
import EditePlayer from "../../pages/organizer_dashboard/components/Players/editePlayer";
import { OrganizerDashboard } from "../../pages/organizer_dashboard/index";
import OrganizerLogin from "../../pages/organizer_dashboard/components/OrganizerLogin/OrganizerLogin";
import { TournamentForm } from "../../pages/tournament_setup_form/index";
import GameList from "../../pages/organizer_dashboard/components/Games/ListGame";

//tournament form flag
const createTournamentRequest = "CREATE_TOURNAMENT"; //for creating tournament form handling
const updateTournamentRequest = "UPDATE_TOURNAMENT"; //for updating exisiting tournament form handling

export const RoutesManger = () => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />

            <Route path="organizer/">
              <Route index element={<OrganizerLogin />} />
              <Route path="dashboard/">
                <Route index element={<OrganizerDashboard />} />
                <Route path="supervisors/">
                  <Route index element={<SupervisorList />} />
                  <Route path="add" element={<AddSupervisor />} />
                  <Route
                    path="edit/:supervisorId"
                    element={<EditeSupervisor />}
                  />
                </Route>

                <Route path="games/">
                  <Route index element={<GameList/>} />
                  <Route path="add" element={<h1>addgame</h1>} />
                  <Route
                    path="edit/:gameId"
                    element={<h1>editegame</h1>}
                  />
                </Route>
                <Route path="players/">
                  <Route index element={<PlayerList />} />
                  <Route path="add" element={<AddPlayer />} />
                  <Route path="edit/:playerId" element={<EditePlayer />} />
                </Route>
                <Route path="select-game/">
                  <Route index element={<SelectGame />} />
                  <Route
                    path="tournament-setup/:gameName"
                    element={
                      <TournamentForm request={createTournamentRequest} />
                    }
                  />
                </Route>
                <Route
                  path="management/:tournamentId"
                  element={<TournamentForm request={updateTournamentRequest} />}
                />
              </Route>
            </Route>

            <Route path="supervisor/">
              <Route index element={<h1>Login</h1>} />
              <Route path="tournaments">
                <Route index element={<Tournaments />} />
                <Route path=":id" element={<Matches />} />
              </Route>
            </Route>

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

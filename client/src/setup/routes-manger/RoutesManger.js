import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import SelectGame from "../../pages/create_tournement_select_game/SelectGame";
import { Temp } from "../../pages/home_page/Temp";
import { DetailedTournamentCard } from "../../common/Detailed-Tornament-Card";
import { TournamentManagementPage } from "../../pages/tournament-management-page";
import { TournamentDashboard } from "../../pages/tournaments_dashboard";
import { TournamentForm } from "../../pages/tournament_setup_form/index";
import DynamicForm from "../../pages/tournament_setup_form/componenets/Dynamic/DynamicForm";
import axios from "axios";
//tournament form flag
const createTournamentRequest = "CREATE_TOURNAMENT"; //for creating tournament form handling
const updateTournamentRequest = "UPDATE_TOURNAMENT"; //for updating exisiting tournament form handling

export const RoutesManger = () => {
  //<Link to="/management"> <button style={{color:"red"}}  type="button" className="ms-5 border btn btn-dark">Manage</button></Link>
  return (
    <BrowserRouter>
      <React.Fragment>
        <Routes>
          <Route path="/">
            <Route index element={<Temp />} />
            <Route path="select-game/" element={<SelectGame />}></Route>
            <Route
              path="select-game/tournament-setup/:gameName"
              element={<TournamentForm request={createTournamentRequest} />}
            />

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

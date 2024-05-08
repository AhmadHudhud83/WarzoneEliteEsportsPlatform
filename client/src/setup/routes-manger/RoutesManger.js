import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import SelectGame from "../../pages/create_tournement_select_game/SelectGame";
import { Temp } from "../../pages/home_page/Temp";
import { DetailedTournamentCard } from "../../common/Detailed-Tornament-Card";
import { TournamentManagementPage } from "../../pages/tournament-management-page";
import { TournamentDashboard } from "../../pages/tournaments_dashboard";
import { ManagementButton } from "../../common/Detailed-Tornament-Card/managementButton/ManagementButton";
import Tournaments from "../../pages/supervisor/tournaments/Tournaments";
import Matches from "../../pages/supervisor/matches/Matches";

export const RoutesManger = () => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Routes>
          <Route path="/">
            <Route index element={<Temp />} />
            <Route path="create-tournament" element={<SelectGame />} />
            <Route
              path="detailed-tournament/:id"
              element={
                <DetailedTournamentCard>
                  <ManagementButton url="management" />
                </DetailedTournamentCard>
              }
            />
            <Route
              path="detailed-tournament/:id/management"
              element={<TournamentManagementPage></TournamentManagementPage>}
            />
            <Route
              path="tournamentDashboard"
              element={<TournamentDashboard></TournamentDashboard>}
            />
            <Route
              path="tournament-overview/:id"
              element={<DetailedTournamentCard></DetailedTournamentCard>}
            ></Route>
            <Route path="supervisor/">
              <Route index element={<h1>Login</h1>} />
              <Route path="tournaments">
                <Route index element={<Tournaments />} />
                <Route path=":id" element={<Matches />} />
              </Route>
            </Route>
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

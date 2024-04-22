
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import SelectGame from "../../pages/create_tournement_select_game/SelectGame";
import { Temp } from "../../pages/home_page/Temp";
export const RoutesManger = ()=>{


return(<BrowserRouter>
    <React.Fragment>
      <Routes>
        <Route path="/">
          <Route index element={<Temp/>} />
          <Route path="create-tournament" element={<SelectGame />} />

          <Route path="*" element={<h1>Error 404 ! Page not found</h1>} /> 
        </Route>
      </Routes>
    </React.Fragment>
  </BrowserRouter>
)


    
}
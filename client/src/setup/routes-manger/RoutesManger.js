
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import SelectGame from "../../pages/create_tournement_select_game/SelectGame";
import { Temp } from "../../pages/home_page/Temp";
import { NotFoundPage } from "../../common/notFoundPage";
import { AboutUs } from "../../pages/aboutUs_oage/aboutUs";

export const RoutesManger = ()=>{


return(<BrowserRouter>
    <React.Fragment>
      <Routes>
        <Route path="/">
          <Route index element={<Temp/>} />
          <Route path="create-tournament" element={<SelectGame />} />
          <Route path="aboutUs" element={<AboutUs/>}/>
          

          <Route path="*" element={<NotFoundPage/>} /> 
          
        </Route>
      </Routes>
    </React.Fragment>
  </BrowserRouter>
)



}
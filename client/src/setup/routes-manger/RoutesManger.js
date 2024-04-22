
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import SelectGame from "../../pages/create_tournement_select_game/SelectGame";
import { Temp } from "../../pages/home_page/Temp";
import ContactUs from "../../pages/contact_us/ContactUs";
export const RoutesManger = ()=>{


return(<BrowserRouter>
    <React.Fragment>
      <Routes>
        <Route path="/">
          <Route index element={<Temp/>} />
          <Route path="create-tournement" element={<SelectGame />} />
          <Route path="contact-us" element={<ContactUs/>} />
          <Route path="*" element={<h1>Error 404 ! Page not found</h1>} /> 
        </Route>
      </Routes>
    </React.Fragment>
  </BrowserRouter>
)


    
}
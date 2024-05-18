import React, { useState } from "react"
import './style.css'

import BasicsForm from "../tournament_setup_form/componenets/Basics/BasicsForm.js"
import InfoForm from "../tournament_setup_form/componenets/Info/InfoForm.js"
import SettingsForm from "../tournament_setup_form/componenets/Settings/SettingsForm.js"
import SupervisorsAndSponsors from "../tournament_setup_form/componenets/Supervisors_Sponsors/SupervisorsAndSponsors.js"

export const TournamentManagementPage =()=>{
    const [formData,setFormData]  = useState({})
    const formChangeHandler =  (newForm)=>{
        setFormData(newForm)
    }

    const topNavElements =[
        {label:"BASICS",componenet:<BasicsForm formData={formData} setFormData={formChangeHandler}  />},
       // {label:"INFO",componenet:<InfoForm/>},
       // {label:"SETTINGS",componenet:<SettingsForm/>},
      //  {label:"SUPERVISORS & SPONSORS",componenet:<SupervisorsAndSponsors/>},
    ]


    return (<React.Fragment>
        {topNavElements.map((e)=>e.componenet)}
<h1>hello from management page</h1>

    </React.Fragment>)
}
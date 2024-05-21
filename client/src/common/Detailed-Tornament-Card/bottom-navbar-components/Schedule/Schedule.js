import React, { useContext } from "react"
import { useTournamentDetails } from "../.."
export const Schedule = ()=>{
    const tournamentDetails = useContext(useTournamentDetails)
    return(<React.Fragment>

<div className=" p-5">
       <h4>Schedule</h4>
       <hr></hr>
       <p className="text-muted mt-3">{tournamentDetails.schedule}</p> 

        </div>
    </React.Fragment>)
}
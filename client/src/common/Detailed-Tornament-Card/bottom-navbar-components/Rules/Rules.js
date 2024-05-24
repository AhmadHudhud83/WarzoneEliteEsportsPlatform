import React, { useContext } from "react"
import { useTournamentDetails } from "../.."
export const Rules = ()=>{
    const tournamentDetails =useContext(useTournamentDetails)
    return(<React.Fragment>

        <div className=" py-5">
       <h4>Rules</h4>
       <hr></hr>
       <p className="text-muted mt-3">{tournamentDetails.rules}</p> 

        </div>
    </React.Fragment>)
}
import React, { useContext } from "react"
import { useTournamentDetails } from "../.."
export const Description = ()=>{
    const tournamentDetails =useContext(useTournamentDetails)
    return(<React.Fragment>

        <div className="border p-5">
       <h4>DESCRIPTION</h4>
       <hr></hr>
       <p className="text-muted mt-3">{tournamentDetails.description}</p> 

        </div>
    </React.Fragment>)
}
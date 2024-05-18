import React, { useContext } from "react"
import { useTournamentDetails } from "../.."
export const Contact = ()=>{
    const tournamentDetails=useContext(useTournamentDetails)
    return(<React.Fragment>

<div className=" p-5">
       <h4>Contact Details</h4>
       <hr></hr>
       <p className="text-muted mt-3">{tournamentDetails.contact_details}</p> 

        </div>
    </React.Fragment>)
}
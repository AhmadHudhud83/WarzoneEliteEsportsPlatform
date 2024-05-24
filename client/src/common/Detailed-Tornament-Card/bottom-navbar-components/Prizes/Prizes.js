import React, { useContext } from "react"
import { useTournamentDetails } from "../.."
export const Prizes = ()=>{
    const tournamentDetails = useContext(useTournamentDetails)
    return(<React.Fragment>

<div className=" py-5">
       <h4>Prizes</h4>
       <hr></hr>
       <p className="text-muted mt-3">{tournamentDetails.prize}</p> 

        </div>
    </React.Fragment>)
}
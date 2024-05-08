import React, { useContext } from "react"
import { useTournamentDetails } from "../.."
export const Details = ()=>{
    const tournamentDetails = useContext(useTournamentDetails)
   
    return(<React.Fragment>

     
        <div className="mt-4">
        <h6 className="text-muted">Game</h6>
        <h4>{tournamentDetails.game}</h4>
        <hr></hr>
        </div>
        <div>
        <h6 className="text-muted">Date & Time</h6>
        <h4>{tournamentDetails.start_date}</h4>
        <h5 className="mt-4">{tournamentDetails.start_time}</h5>
        <hr></hr>
        </div>

        <div>
                <h6 className="text-muted">Format</h6>
                <h4>{tournamentDetails.format}</h4>
        </div>
      
    </React.Fragment>)
}
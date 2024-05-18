import React from "react"
import { useContext } from "react"
import { useTournamentDetails } from "../.."
const Sponsors = ()=>{
    const tournamentDetails =useContext(useTournamentDetails)
    return(<React.Fragment>
       {tournamentDetails.sponsors.map((i)=><><h1>{i.name}</h1>
       <h1>{i.email}</h1>
       </>)}
    </React.Fragment>)
}
export default Sponsors
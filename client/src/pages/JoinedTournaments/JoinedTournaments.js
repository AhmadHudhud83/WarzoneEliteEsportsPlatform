
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import TournamentCard from "../supervisor_dashboard/components/tournament_card/TournamentCard";
import axios from "axios";

const JoinedTournaments = ()=>{
    const params = useParams();
    const [userTournaments ,setUserTournaments]=useState({})
    useEffect(()=>{
      
    },[])

    return <React.Fragment>
        <h1 onClick={()=>console.log(params)}>Joined touranments</h1>
    {/* <TournamentCard/> */}
    </React.Fragment>
}
export default JoinedTournaments
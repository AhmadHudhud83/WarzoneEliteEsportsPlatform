
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import TournamentCard from "../supervisor_dashboard/components/tournament_card/TournamentCard";
import axios from "axios";
import { useTranslation } from 'react-i18next'
const JoinedTournaments = () => {
    const { t, i18n } = useTranslation()
    const params = useParams();
    const [userTournaments, setUserTournaments] = useState({})
    useEffect(() => {

    }, [])

    return <React.Fragment>
        <h1 onClick={() => console.log(params)}>{t("Joined touranments")}</h1>
        {/* <TournamentCard/> */}
    </React.Fragment>
}
export default JoinedTournaments
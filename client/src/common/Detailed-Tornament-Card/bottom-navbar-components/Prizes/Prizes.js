import React, { useContext } from "react"
import { useTournamentDetails } from "../.."
import { useTranslation } from 'react-i18next'
export const Prizes = ()=>{
    const { t, i18n } = useTranslation()
    const tournamentDetails = useContext(useTournamentDetails)
    return(<React.Fragment>

<div className=" py-5">
       <h4>{t("Prizes")}</h4>
       <hr></hr>
       <p className="text-muted mt-3">{tournamentDetails.prize}</p> 

        </div>
    </React.Fragment>)
}
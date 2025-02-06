import React, { useContext } from "react"
import { useTournamentDetails } from "../.."
import { useTranslation } from 'react-i18next'

export const Rules = () => {
    const { t, i18n } = useTranslation()
    const tournamentDetails = useContext(useTournamentDetails)
    return (<React.Fragment>

        <div className=" py-5">
            <h4>{t("Rules")}</h4>
            <hr></hr>
            <p className="text-muted mt-3">{tournamentDetails.rules}</p>

        </div>
    </React.Fragment>)
}
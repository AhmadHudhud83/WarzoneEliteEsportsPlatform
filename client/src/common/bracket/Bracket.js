import { useEffect } from "react";
import { useState } from "react";
import styles from "./Bracket.module.css";
import axios from "axios";
import UserModal from "../user_modal/UserModal";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next'
import SupervisorAuthCheck from "../../pages/CheckAuth/SupervisorCheckAuth";
import OrganizerAuthCheck from "../../pages/CheckAuth/OrganizerCheckAuth";
import Cookies from "js-cookie";

const Bracket = ({ user, tournamentId, viewFlag }) => {
    const { t, i18n } = useTranslation()
    const navigate = useNavigate();
    const [supervisorId, setSupervisorId] = useState(""); // The id of the current supervisor
    const [matches, setMatches] = useState([]);
    const [currentRound, setCurrentRound] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null); // The team that the supervisor clicked on
    const roundRef = React.createRef(null);
    const [status, setStatus] = useState("Unitialized");
    let isAuthChecked;
    if (!viewFlag && user === "supervisor") {
        isAuthChecked = SupervisorAuthCheck().isAuthChecked;
    }
    else if (!viewFlag && user === "organizer") {
        isAuthChecked = OrganizerAuthCheck().isAuthChecked
    }


    useEffect(() => {
        if (user === "supervisor") {
            // Retrieve the current supervisor id from the Cookies
            setSupervisorId(Cookies.get("supervisor_id"));
        }
        fetchTournamentData();
    }, []);

    const fetchTournamentData = () => {
        axios.get(`http://localhost:5000/api/tournaments/${tournamentId}`)
            .then((response) => {
                const tournament = response.data;
                setMatches(tournament.matches);
                setCurrentRound(tournament.currentRound);
                setStatus(tournament.tournament_status);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const refreshHandler = () => {
        fetchTournamentData();
    }

    // Handle the outcome of a match
    const handleOutcome = (matchId, outcome) => {
        axios.patch(`http://localhost:5000/api/tournaments/${tournamentId}/matches/${matchId}/set-winner`, { player: outcome }, { withCredentials: true })
            .then(() => {
                const newMatches = [...matches];
                newMatches[currentRound][matchId].winner = outcome;
                setMatches(newMatches);
            }).catch((error) => {
                console.log(error);
            });
    };

    const handleTeamClick = (team) => {
        if (team === "bye" || (user !== "organizer" && user !== "supervisor")) {
            return;
        }
        // Open the modal
        setSelectedTeam(team);
        setIsModalOpen(true);
    }

    if (!isAuthChecked && !viewFlag) {
        return <div>Loading...</div>;
    }

    return (
        <div id={styles.container}>
            {user !== "user" ? <button onClick={() => { navigate(-1) }} className="btn text-white btn-danger m-3"> <i className="fa-solid fa-backward me-2" />
                back</button> : <></>}


            <button onClick={() => refreshHandler()} className="btn m-3 btn-danger "> <i className="fa-solid fa-arrow-rotate-left me-2" />
                refresh</button>

            {status === "Uninitialized" ? ( // If the tournament hasn't been initialized yet
                <h2 id={styles.uninitialized}> The tournament hasn't been initialized yet</h2>
            ) : (
                // If the tournament has been initialized
                <div id={matches.length > 4 ? styles.bracket : styles.centered_bracket} // If there are less than 5 rounds, center the bracket
                >
                    {matches.map((round, roundIndex) => { // For each round

                        if (roundIndex <= currentRound) { // If the round has already been played or is currently being played
                            return (
                                <div className={styles.round}>
                                    <h3 onClick={
                                        () => { roundRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
                                    }>
                                        Round {roundIndex + 1}</h3>
                                    <div className={styles.round_div}>
                                        {round.map((match, index) => ( // For each match in the round

                                            <div className={styles["match-container"]} >
                                                <div className={styles.match}>
                                                    <div className={styles.team + " " +
                                                        ((match.winner !== null) ?
                                                            (match.winner._id === match.team1._id ?
                                                                styles.winner : styles.loser) : "")}> {/* If the team is the winner, color it green else color it red */}
                                                        <div onClick={() => handleTeamClick(match.team1)} className={(user === "organizer" || user === "supervisor" ? styles.clickable : "")}>
                                                            {match.team1.name}
                                                        </div> {/* If the user is an organizer or supervisor, make the team name clickable */}

                                                        {/* If the user is an organizer or supervisor and the match winner is undecided, show the winner button */}
                                                        <button className={styles["winner-btn"] + " " +
                                                            ((user === "organizer" ||
                                                                (user === "supervisor" && match.supervisor._id === supervisorId)) &&
                                                                (match.winner === null)
                                                                ? styles.vis : styles.invis)}
                                                            onClick={() => handleOutcome(index, match.team1)}>WINNER</button>
                                                    </div>
                                                    <div className={styles.team + " " +
                                                        ((match.winner !== null) ?
                                                            (((match.winner._id === match.team2._id) &&
                                                                (match.winner !== "none")) ?
                                                                styles.winner : styles.loser) : "")}> {/* If the team is the winner, color it green else color it red */}
                                                        <div onClick={() => handleTeamClick(match.team2)} className={(user === "organizer" || user === "supervisor" ? styles.clickable : "")}>
                                                            {match.team2 === "bye" ? "BYE" : match.team2.name}
                                                        </div> {/* If the user is an organizer or supervisor, make the team name clickable */}
                                                        {/* If the user is an organizer or supervisor and the match winner is undecided, show the winner button */}
                                                        <button className={styles["winner-btn"] + " " +
                                                            ((user === "organizer" ||
                                                                (user === "supervisor" && match.supervisor._id === supervisorId)) &&
                                                                (match.team2 !== "bye") &&
                                                                (match.winner === null)
                                                                ? styles.vis : styles.invis)}
                                                            onClick={() => handleOutcome(index, match.team2)}>{t("WINNER")}</button>
                                                    </div>
                                                </div>

                                                {/* If the user is an organizer or supervisor and the match winner is undecided, show the none button */}
                                                <button className={styles.none + " " +
                                                    ((user === "organizer" ||
                                                        (user === "supervisor" && match.supervisor._id === supervisorId)) &&
                                                        (match.winner === null)
                                                        ? styles.vis : styles.invis)}
                                                    onClick={() => handleOutcome(index, "none")}>{t("None")}</button>
                                            </div>
                                        ))}

                                    </div>

                                </div>

                            );
                        }
                        // If the round hasn't been played yet
                        return <div className={styles.round} ref={roundRef}>
                            <h3 onClick={
                                () => { roundRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
                            }>{t("Round")} {roundIndex + 1}</h3>
                            <div className={styles.round_div}>
                                {round.map(() => ( // For each match in the round
                                    <div className={styles["match-container"]}>
                                        <div className={styles.match}>
                                            <div className={styles.team + " " + styles.team}>{t("Undecided Yet")}</div>
                                            <div className={styles.team}>{"Undecided Yet"}</div>
                                        </div> {/* If the user is an organizer or supervisor, make the team name clickable */}
                                    </div>
                                ))}
                            </div>
                        </div>;
                    })
                    }
                </div>)
            }
            <UserModal user={selectedTeam} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />

        </div >
    );
}

export default Bracket;
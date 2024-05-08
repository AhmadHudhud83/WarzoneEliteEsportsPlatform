import { useEffect } from "react";
import { useState } from "react";
import styles from "./Bracket.module.css";
import axios from "axios";



const Bracket = ({ user, tournamentId }) => {
    const [supervisorId, setSupervisorId] = useState("");
    const [tournament, setTournament] = useState({});
    useEffect(() => {
        if (user === "supervisor") {
            // Retrieve the current supervisor id from the session storage
            //const supervisorId = sessionStorage.getItem("supervisorId");
            const supervisorId = "supervisor1";
            setSupervisorId(supervisorId);
        }
        axios.get(`/tournaments/${tournamentId}`)
            .then((response) => {
                setTournament(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);



    const handleOutcome = (matchId, outcome) => {
        axios.patch(`/tournaments/${tournamentId}/matches/${matchId}/set-winner`, { player: outcome })
            .then((response) => {
                const updatedTournaments = [...tournament];
                updatedTournaments[matchId].winner = outcome;
                setTournament(updatedTournaments);
            })
    };

    return (
        <div id={styles.container}>
            <div id={styles.bracket}>
                {tournament.matches.map((round, index) => {
                    if (index > tournament.currentRound) {
                        return <div className={styles.round} >
                            {round.map((match) => (
                                <div className={styles["match-container"]}>
                                    <div className={styles.match}>
                                        <div className={styles.team + " " + styles.team}>Undecided Yet</div>
                                        <div className={styles.team}>{match.team2 === "bye" ? "bye" : "Undecided Yet" + " "}</div>
                                    </div>
                                </div>
                            ))}
                        </div>;
                    }

                    return (

                        <div className={styles.round}>
                            {tournament}
                            {round.map((match, index) => {
                                if (match !== null) {
                                    <div className={styles["match-container"]}>
                                        <div className={styles.match}>
                                            <div className={styles.team + " " + ((match.winner !== null) ? (match.winner.id === match.team1.id ? styles.winner : styles.loser) : "")}>
                                                {match.team1.name}
                                                <button className={styles["winner-btn"] + " " + ((match.supervisor.id === supervisorId) && (tournament.matches[tournament.currentRound][index].winner === null) ? styles.vis : styles.invis)}
                                                    onClick={() => handleOutcome(index, match.team1)}>WINNER</button>
                                            </div>
                                            <div className={styles.team + " " + ((match.winner !== null) ? (((match.winner.id === match.team2.id) && (match.winner !== "none")) ? styles.winner : styles.loser) : "")}>
                                                {match.team2 === "bye" ? "BYE" : match.team2.name}
                                                <button className={styles["winner-btn"] + " " + ((match.supervisor.id === supervisorId) && (match.team2 !== "bye") && (tournament.matches[tournament.currentRound][index].winner === null) ? styles.vis : styles.invis)}
                                                    onClick={() => handleOutcome(index, match.team2)}>WINNER</button>
                                            </div>
                                        </div>
                                        <button className={styles.none + " " + ((match.supervisor.id === supervisorId) && (tournament.matches[tournament.currentRound][index].winner === null) ? styles.vis : styles.invis)}
                                            onClick={() => handleOutcome(index, "none")}>None</button>
                                    </div>
                                }
                            })}
                        </div>

                    );
                })
                }
            </div>
        </div>
    );
}

export default Bracket;
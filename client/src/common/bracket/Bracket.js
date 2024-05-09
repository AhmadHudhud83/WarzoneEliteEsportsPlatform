import { useEffect } from "react";
import { useState } from "react";
import styles from "./Bracket.module.css";
import axios from "axios";



const Bracket = ({ user, tournamentId }) => {
    const [supervisorId, setSupervisorId] = useState("");
    const [matches, setMatches] = useState([]);
    const [currentRound, setCurrentRound] = useState(0);
    useEffect(() => {
        if (user === "supervisor") {
            // Retrieve the current supervisor id from the session storage
            //const supervisorId = sessionStorage.getItem("supervisorId");
            const supervisorId = "s1";
            setSupervisorId(supervisorId);
        }
        axios.get(`/tournaments/${tournamentId}`)
            .then((response) => {
                const tournament = response.data;
                setMatches(tournament.matches);
                setCurrentRound(tournament.currentRound);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);



    const handleOutcome = (matchId, outcome) => {
        axios.patch(`/tournaments/${tournamentId}/matches/${matchId}/set-winner`, { player: outcome })
            .then((response) => {
                const newMatches = [...matches];
                newMatches[currentRound][matchId].winner = outcome;
                setMatches(newMatches);
            })
    };

    return (
        <div id={styles.container}>
            <div id={styles.bracket}>
                {matches.map((round, roundIndex) => {
                    if (roundIndex <= currentRound) {
                        return (
                            <div className={styles.round}>
                                {round.map((match, index) => (
                                    <div className={styles["match-container"]} >
                                        <div className={styles.match}>
                                            <div className={styles.team + " " + ((match.winner !== null) ? (match.winner.id === match.team1.id ? styles.winner : styles.loser) : "")}>
                                                {match.team1.name}
                                                <button className={styles["winner-btn"] + " " + ((currentRound === roundIndex) && (match.supervisor.id === supervisorId) && (match.winner === null) ? styles.vis : styles.invis)}
                                                    onClick={() => handleOutcome(index, match.team1)}>WINNER</button>
                                            </div>
                                            <div className={styles.team + " " + ((match.winner !== null) ? (((match.winner.id === match.team2.id) && (match.winner !== "none")) ? styles.winner : styles.loser) : "")}>
                                                {match.team2 === "bye" ? "BYE" : match.team2.name}
                                                <button className={styles["winner-btn"] + " " + ((match.supervisor.id === supervisorId) && (match.team2 !== "bye") && (match.winner === null) ? styles.vis : styles.invis)}
                                                    onClick={() => handleOutcome(index, match.team2)}>WINNER</button>
                                            </div>
                                        </div>
                                        <button className={styles.none + " " + ((match.supervisor.id === supervisorId) && (match.winner === null) ? styles.vis : styles.invis)}
                                            onClick={() => handleOutcome(index, "none")}>None</button>
                                    </div>

                                ))}
                            </div>

                        );
                    }

                    return <div className={styles.round} >
                        {round.map(() => (
                            <div className={styles["match-container"]}>
                                <div className={styles.match}>
                                    <div className={styles.team + " " + styles.team}>Undecided Yet</div>
                                    <div className={styles.team}>{"Undecided Yet"}</div>
                                </div>
                            </div>
                        ))}
                    </div>;


                })
                }
            </div>
        </div>
    );
}

export default Bracket;
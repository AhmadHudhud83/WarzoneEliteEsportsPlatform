import { useEffect } from "react";
import { useState } from "react";
import styles from "./Bracket.module.css";
import axios from "axios";
import UserModal from "../user_modal/UserModal";
import React from "react";

const Bracket = ({ user, tournamentId }) => {
    const [supervisorId, setSupervisorId] = useState("");
    const [matches, setMatches] = useState([]);
    const [currentRound, setCurrentRound] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [scale, setScale] = useState(1);
    const roundRef = React.createRef(null);
    useEffect(() => {
        if (user === "supervisor") {
            // Retrieve the current supervisor id from the session storage
            //const supervisorId = sessionStorage.getItem("supervisorId");
            const supervisorId = "s1";
            setSupervisorId(supervisorId);
        }
        axios.get(`http://localhost:5000/api/tournaments/${tournamentId}`)
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
        axios.patch(`http://localhost:5000/api/tournaments/${tournamentId}/matches/${matchId}/set-winner`, { player: outcome })
            .then((response) => {
                const newMatches = [...matches];
                newMatches[currentRound][matchId].winner = outcome;
                setMatches(newMatches);
            })
    };

    const handleTeamClick = (team) => {
        if (team === "bye" || (user !== "organizer" && user !== "supervisor")) {
            return;
        }
        // Open the modal
        setSelectedTeam(team);
        setIsModalOpen(true);
    }

    return (
        <div id={styles.container}>
            {currentRound === -1 ? (
                <h2 id={styles.uninitialized}> The tournament hasn't been initialized yet</h2>
            ) : (
                <div id={matches.length > 4 ? styles.bracket : styles.centered_bracket} style={{ transform: `scale(${scale})` }}>
                    {matches.map((round, roundIndex) => {

                        if (roundIndex <= currentRound) {
                            return (
                                <div className={styles.round}>
                                    <h3 onClick={
                                        () => { roundRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
                                    }>
                                        Round {roundIndex + 1}</h3>
                                    <div className={styles.round_div}>
                                        {round.map((match, index) => (
                                            <div className={styles["match-container"]} >
                                                <div className={styles.match}>
                                                    <div className={styles.team + " " +
                                                        ((match.winner !== null) ?
                                                            (match.winner._id === match.team1._id ?
                                                                styles.winner : styles.loser) : "")}>
                                                        <div onClick={() => handleTeamClick(match.team1)} className={(user === "organizer" || user === "supervisor" ? styles.clickable : "")}>
                                                            {match.team1.name}
                                                        </div>

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
                                                                styles.winner : styles.loser) : "")}>
                                                        <div onClick={() => handleTeamClick(match.team1)} className={(user === "organizer" || user === "supervisor" ? styles.clickable : "")}>
                                                            {match.team2 === "bye" ? "BYE" : match.team2.name}
                                                        </div>
                                                        <button className={styles["winner-btn"] + " " +
                                                            ((user === "organizer" ||
                                                                (user === "supervisor" && match.supervisor._id === supervisorId)) &&
                                                                (match.team2 !== "bye") &&
                                                                (match.winner === null)
                                                                ? styles.vis : styles.invis)}
                                                            onClick={() => handleOutcome(index, match.team2)}>WINNER</button>
                                                    </div>
                                                </div>
                                                <button className={styles.none + " " +
                                                    ((user === "organizer" ||
                                                        (user === "supervisor" && match.supervisor._id === supervisorId)) &&
                                                        (match.winner === null)
                                                        ? styles.vis : styles.invis)}
                                                    onClick={() => handleOutcome(index, "none")}>None</button>
                                            </div>
                                        ))}
                                    </div>

                                </div>

                            );
                        }
                        return <div className={styles.round} ref={roundRef}>
                            <h3 onClick={
                                () => { roundRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
                            }>Round {roundIndex + 1}</h3>
                            <div className={styles.round_div}>
                                {round.map(() => (
                                    <div className={styles["match-container"]}>
                                        <div className={styles.match}>
                                            <div className={styles.team + " " + styles.team}>Undecided Yet</div>
                                            <div className={styles.team}>{"Undecided Yet"}</div>
                                        </div>
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
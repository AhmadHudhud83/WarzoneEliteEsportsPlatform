import styles from "./TournamentCard.module.css";

const TournamentCard = ({ tournament }) => {
    return (
        <div className={styles.card + " " + (tournament.tournament_status === "Finished" ? styles.finished : "")}>
            <a href={`/supervisor/tournaments/${tournament._id}`}>
                <img src={tournament.cover_image_url} alt={tournament.title} />
                <div>
                    <h3>{tournament.title}</h3>
                    {tournament.tournament_status === "Uninitialized" ? <p>Not Started Yet</p> : tournament.tournament_status === "Finished" ? <p>Finished</p> : <p>Current Round: {tournament.currentRound}</p>}
                </div>

            </a>
        </div>
    );
};

export default TournamentCard;
import styles from "./TournamentCard.module.css";

const TournamentCard = ({ tournament }) => {
    return (
        <div className={styles.card}>
            <a href={`/supervisor/tournaments/${tournament._id}`}>
                <img src={tournament.image} alt={tournament.title} />
                <div>
                    <h3>{tournament.title}</h3>
                    <p>Current Round: {tournament.currentRound}</p>
                </div>

            </a>
        </div>
    );
};

export default TournamentCard;
import { Link } from "react-router-dom";
import styles from "./GameCard.module.css";

function GameCard({ name, imgUrl,id }) {

  const url = `/organizer/dashboard/select-game/tournament-setup/${name}`;

  return (
    <div className={styles.card}>
      <Link to={url}>
        <img src={imgUrl} alt={name} />
        <h3>{name}</h3>
      </Link>
      
    </div>
  );
}

export default GameCard;

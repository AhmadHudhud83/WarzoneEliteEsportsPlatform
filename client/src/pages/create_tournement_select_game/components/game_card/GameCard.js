import styles from "./GameCard.module.css";

function GameCard({ name, imgUrl,id }) {
  const url = `tournament-setup/${id}`;

  return (
    <div className={styles.card}>
      <a href={url}>
        <img src={imgUrl} alt={name} />
        <h3>{name}</h3>
      </a>
      
    </div>
  );
}

export default GameCard;

import styles from "./GameCard.module.css";

function GameCard({ name, imgUrl }) {
  const url = `tournament-setup/${name.toLowerCase()}`;

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

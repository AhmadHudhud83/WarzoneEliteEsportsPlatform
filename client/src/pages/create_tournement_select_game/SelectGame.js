import styles from "./SelectGame.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import GameCard from "./components/game_card/GameCard";
import { games } from "./dummyData";

function SelectGame() {
  const searchInput = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [numGamesToShow, setNumGamesToShow] = useState(4);
  const [searchResults, setSearchResults] = useState([]);

  const handleIconClick = () => {
    searchInput.current.focus();
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    const searchResults = games.filter((game) =>
      game.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResults(searchResults);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1800) {
        setNumGamesToShow(20);
      } else if (window.innerWidth >= 1400) {
        setNumGamesToShow(20);
      } else {
        setNumGamesToShow(20);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div id={styles.container}>
      <div className="container-xlg">
        <h1>SELECT A GAME</h1>
        <div id={styles["search-container"]}>
          <FontAwesomeIcon
            id={styles["search-icon"]}
            icon={faSearch}
            onClick={handleIconClick}
          />
          <input
            ref={searchInput}
            id={styles.search}
            type="text"
            placeholder=""
            autoComplete="off"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
        {searchValue === "" ? (
          <>
            <h2>Most Popular Games</h2>
            <div id={styles["games-container"]}>
              {games
                .sort((a, b) => b.popularity - a.popularity)
                .slice(0, numGamesToShow)
                .map((game) => (
                  <GameCard name={game.name} imgUrl={game.imgUrl} />
                ))}
            </div>
          </>
        ) : (
          <div id={styles["games-container"]}>
            {searchResults.map((game) => (
              <GameCard name={game.name} imgUrl={game.imgUrl} />
            ))}
            <div id={styles.contact}>
              <p>can't find the game? please reach us</p>
              <a href="contact">here</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectGame;

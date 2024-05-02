import styles from "./SelectGame.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import GameCard from "./components/game_card/GameCard";
import axios from "axios";

function SelectGame() {
  const searchInput = useRef(null); // Reference to the search input element
  const [searchValue, setSearchValue] = useState(""); // The value of the search input
  const [searchResults, setSearchResults] = useState([]); // The search results
  const [data, setData] = useState([]); // The data fetched from the server
  const numGamesToShow = 20; // The number of games to show initially

  // Focus the search input when the search icon is clicked
  const handleIconClick = () => {
    searchInput.current.focus();
  };

  // Handle the search input change
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    const res = data.filter((game) =>
      game.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    if (e.target.value === "") {
      setSearchResults(data);
      return;
    }
    setSearchResults(res);
  };

  // Fetch the game data from the server
  useEffect(() => {
    axios
      .get("http://localhost:5000/Games")
      .then((response) => {
        setSearchResults(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching game data:", error);
      });
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
        {searchValue === "" ? ( // If the search input is empty, show the number of games specified in numGamesToShow
          <>
            <h2>Most Popular Games</h2>
            <div id={styles["games-container"]}>
              {searchResults.slice(0, numGamesToShow).map((game) => (
                <GameCard name={game.name} imgUrl={game.imgUrl} />
              ))}
            </div>
          </>
        ) : (
          // If the search input is not empty, show the search results
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

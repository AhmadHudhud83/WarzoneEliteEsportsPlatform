import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header/Header";
import styles from "./Tournaments.module.css";
import TournamentCard from "../components/tournament_card/TournamentCard";
import SupervisorAuthCheck from "../../CheckAuth/SupervisorCheckAuth";
import Cookies from "js-cookie";

function TournamentPage() {
  const [tournaments, setTournaments] = useState([]);

  const { isAuthChecked } = SupervisorAuthCheck();

  useEffect(() => {
    // Retrieve the current supervisor id from the Cookies
    const supervisorId = Cookies.get("supervisor_id");

    // Fetch the tournaments which the supervisor is part of its supervisors array
    axios
      .get(`/api/tournaments/supervised/${supervisorId}`)
      .then((response) => {
        setTournaments(response.data.reverse());
      }
      ).catch((error) => {
        console.error("Error fetching game data:", error);
      });
  }, []);


  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  return (
    <div id={styles.container}>
      <Header />
      <h2>Tournaments In Progress</h2>
      <div id={styles['cards-container']}>
        {tournaments.map((tournament) => (
          <TournamentCard key={tournament._id} tournament={tournament} />
        ))}
      </div>
    </div>
  );
}

export default TournamentPage;

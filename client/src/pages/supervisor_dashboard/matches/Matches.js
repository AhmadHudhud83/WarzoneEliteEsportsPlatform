import { useParams } from 'react-router-dom';
import styles from './Matches.module.css';
import Bracket from '../../../common/bracket/Bracket';
import Header from '../components/header/Header';

const Matches = ({ userType }) => {
    const { id } = useParams();

    return (
        <div id={styles.container}>
            {/* If userType is not user, show the header */}
            {userType !== "user" ? <Header /> : <></>}
            <h1 id={styles.title}>Matches</h1>
            <Bracket user={userType} tournamentId={id} />
        </div>
    );
}

export default Matches;
import { useParams } from 'react-router-dom';
import styles from './Matches.module.css';
import Bracket from '../../../common/bracket/Bracket';
import Header from '../components/header/Header';

const Matches = () => {
    const { id } = useParams();

    return (
        <div id={styles.container}>
            <Header />
            <h1 id={styles.title}>Matches</h1>
            <Bracket user="supervisor" tournamentId={id} />
        </div>
    );
}

export default Matches;
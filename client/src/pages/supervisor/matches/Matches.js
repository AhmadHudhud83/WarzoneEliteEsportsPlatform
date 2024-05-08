import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import styles from './Matches.module.css';
import Bracket from '../components/bracket/Bracket';
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
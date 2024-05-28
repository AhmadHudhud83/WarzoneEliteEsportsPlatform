import styles from './UserModal.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const UserModal = ({ user, isOpen, setIsOpen }) => {
    const [userDetails, setUserDetails] = useState(null);
    useEffect(() => {
        // get user details
        if (!user) return;
        axios
            .get(`http://localhost:5000/player/get?id=${user._id}`)
            .then((res) => {
                setUserDetails(res.data);
            })
    }, [isOpen]);
    return (
        <div className="modal"
            id={isOpen ? styles.open : styles.closed} // show modal if isOpen is true
            onClick={() => setIsOpen(false)}>
            {user ? (
                <div className="modal-dialog modal-dialog-centered" >
                    <div className="modal-content text-white" id={styles.modal}>
                        <div className="modal-header">
                            <h5 className="modal-title">{user.name}</h5>
                            <button type="button" className="btn-close" onClick={() => setIsOpen(false)}></button>
                        </div>
                        <div className="modal-body">
                            {user ? (
                                <>
                                    <p>Email: {userDetails.email}</p>
                                    <p>Game ID: {user.gameTag}</p>
                                    <p>Discord: {user.discordTag}</p>
                                </>
                            ) : (
                                <p>No user selected</p>
                            )}
                        </div>
                    </div>
                </div>
            ) : (<p>No user selected</p>)}
        </div>
    );
}

export default UserModal;
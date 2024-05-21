import styles from './UserModal.module.css';

const UserModal = ({ user, isOpen, setIsOpen }) => {
    return (
        <div className="modal"
            id={isOpen ? styles.open : styles.closed}
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
                                    <p>Email: {user.email}</p>
                                    <p>Game ID: {user.gameId}</p>
                                    <p>Discord: {user.discord}</p>
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
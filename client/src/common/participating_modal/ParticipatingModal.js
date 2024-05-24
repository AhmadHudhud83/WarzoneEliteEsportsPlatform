import styles from './ParticipatingModal.module.css';

const ParticipatingModal = ({ show, onClose, onConfirm, name, setName, gameTag, setGameTag, discordTag, setDiscordTag }) => {
    return (
        <div className={`${styles.modal} ${show ? styles.show : ''}`}>
            <div className={styles.modalContent}>
                <h3>Participating</h3>
                <form>
                    <label>
                        Name <br />
                        <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
                    </label>
                    <label>
                        Game Tag <br />
                        <input type="text" name="gameTag" value={gameTag} onChange={e => setGameTag(e.target.value)} />
                    </label>
                    <label>
                        Discord Tag <br />
                        <input type="text" name="discordTag" value={discordTag} onChange={e => setDiscordTag(e.target.value)} />
                    </label>
                </form>
                <div className={styles.modalFooter}>
                    <button onClick={onClose} className={styles.cancel}>Cancel</button>
                    <button onClick={onConfirm} className={styles.confirm}>Confirm</button>
                </div>

            </div>
        </div>
    )
}

export default ParticipatingModal;
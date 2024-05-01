import React from 'react';
import '../../TournamentSetup.css';

const Info = () => {
  return (
    <div className="info-container border" style={styles.infoContainer}>
      <div className="mb-3">
        <label style={styles.label}>Contact Details</label>
        <textarea
          className="form-control"
          style={styles.textArea}
          defaultValue=""
        />
      </div>
      <div className="mb-3">
        <label style={styles.label}>Rules</label>
        <textarea
          className="form-control"
          style={styles.textArea}
          defaultValue=""
        />
      </div>
      <div className="mb-3">
        <label style={styles.label}>Prizes</label>
        <input
          type="text"
          className="form-control"
          style={styles.input}
          defaultValue=""
        />
      </div>
      <div className="mb-3">
        <label style={styles.label}>Description</label>
        <textarea
          className="form-control"
          style={styles.textArea}
          defaultValue=""
        />
      </div>
    </div>
  );
};

const styles = {
  infoContainer: {
    backgroundColor: '#121212', 
    color: '#fff', 
    padding: '20px',
    borderRadius: '8px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    backgroundColor: '#20232a', 
    color: 'white', 
    borderColor: 'transparent', 
    marginBottom: '10px', 
    padding: '10px', 
  },
  textArea: {
    width: '100%',
    backgroundColor: '#20232a', 
    color: 'white', 
    borderColor: '#444', 
    marginBottom: '10px', 
    padding: '10px', 
    height: '100px', 
  },
};

export default Info;

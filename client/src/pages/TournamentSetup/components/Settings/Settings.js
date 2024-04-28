import React from 'react';
import '../../TournamentSetup.css'; 

const Settings = () => {
  return (
    <div className="settings-container">
      <div className="mb-3">
        <label className="settings-label">Tournament Format</label>
        <input
          type="text"
          className="settings-input"
          defaultValue="Select a Format"
          
        />
      </div>
      <div className="mb-3">
        <label className="settings-label">Tournament Platform</label>
        <input
          type="text"
          className="settings-input"
          defaultValue="1v1"
          
        />
      </div>
      <div className="mb-3">
        <label className="settings-label">Tournament Brackets</label>
        <input
          type="text"
          className="settings-input"
          defaultValue="Select a Brackets Type"
          
        />
      </div>
      <div className="mb-3">
        <label className="settings-label">Max Participants</label>
        <input
          type="number"
          className="settings-input"
          defaultValue="<INT INPUT>"
          
        />
      </div>
      <div className="mb-3">
        <label className="settings-label">Tournament</label>
        <input
          type="text"
          className="settings-input"
          defaultValue="Select a Format"
          
        />
      </div>
    </div>
  );
};

export default Settings;

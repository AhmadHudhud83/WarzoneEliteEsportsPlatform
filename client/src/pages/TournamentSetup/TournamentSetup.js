import React, { useState } from 'react';
import Basics from './components/Basics/Basics';
import Info from './components/Info/Info';
import Settings from './components/Settings/Settings';
import SupervisorsAndSponsors from './components/SupervisorsAndSponsors/SupervisorsAndSponsors';
import PublishTournament from './components/PublishTournament/PublishTournament'; // Import the PublishTournament component
import './TournamentSetup.css';

const CreateTournament = () => {
  const [currentTab, setCurrentTab] = useState('BASICS');

  const handleTabChange = (tabName) => {
    setCurrentTab(tabName);
  };

  return (
    <div className="container">
      <div className="create-tournament-container">
        <div className="tab-titles">
          <span
            className={currentTab === 'BASICS' ? 'tab-title active' : 'tab-title'}
            onClick={() => handleTabChange('BASICS')}
          >
            BASICS
          </span>
          <span
            className={currentTab === 'INFO' ? 'tab-title active' : 'tab-title'}
            onClick={() => handleTabChange('INFO')}
          >
            INFO
          </span>
          <span
            className={currentTab === 'SETTINGS' ? 'tab-title active' : 'tab-title'}
            onClick={() => handleTabChange('SETTINGS')}
          >
            SETTINGS
          </span>
          <span
            className={currentTab === 'SUPERVISORS_AND_SPONSORS' ? 'tab-title active' : 'tab-title'}
            onClick={() => handleTabChange('SUPERVISORS_AND_SPONSORS')}
          >
            SUPERVISORS & SPONSORS
          </span>
          <span // Add a new tab for PUBLISH TOURNAMENT
            className={currentTab === 'PUBLISH' ? 'tab-title active' : 'tab-title'}
            onClick={() => handleTabChange('PUBLISH')}
          >
            PUBLISH TOURNAMENT
          </span>
        </div>

        <div className="tab-content">
          {currentTab === 'BASICS' && <Basics onNavigate={handleTabChange} />}
          {currentTab === 'INFO' && <Info onNavigate={handleTabChange} />}
          {currentTab === 'SETTINGS' && <Settings onNavigate={handleTabChange} />}
          {currentTab === 'SUPERVISORS_AND_SPONSORS' && <SupervisorsAndSponsors />}
          {currentTab === 'PUBLISH' && <PublishTournament />} 
        </div>
      </div>
    </div>
  );
};

export default CreateTournament;

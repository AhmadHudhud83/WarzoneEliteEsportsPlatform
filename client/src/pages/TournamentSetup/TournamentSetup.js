import React, { useState } from 'react';
import Basics from './components/Basics/Basics';
import Info from './components/Info/Info';
import Settings from './components/Settings/Settings';
import SupervisorsAndSponsors from './components/SupervisorsAndSponsors/SupervisorsAndSponsors';
import PublishTournament from './components/PublishTournament/PublishTournament'; 
import './TournamentSetup.css';



const CreateTournament = () => {
  const [currentTab, setCurrentTab] = useState('BASICS');

  const handleTabChange = (tabName) => {
    setCurrentTab(tabName);
  };

  const navElements = [
    "BASICS",'INFO','SETTINGS','SUPERVISORS & SPONSORS','PUBLISH'
  ]

  return (
    <div className="container  ">
      <div className="create-tournament-container">
        <div className="tab-titles p-5 border d-flex justify-content-lg-evenly justify-content-md-between  justify-content-sm-center flex-wrap">
        {navElements.map((i,e)=>{

          return( <h5
            className={currentTab === i ? 'tab-title active mx-2' : 'tab-title mx-2 '}
            onClick={() => handleTabChange(i)}
            key={e}
          >
            {i}
          </h5>)
        })}

         
          
        </div>

        <div className="tab-content">
          {currentTab === 'BASICS' && <Basics onNavigate={handleTabChange} />}
          {currentTab === 'INFO' && <Info onNavigate={handleTabChange} />}
          {currentTab === 'SETTINGS' && <Settings onNavigate={handleTabChange} />}
          {currentTab === 'SUPERVISORS & SPONSORS' && <SupervisorsAndSponsors />}
          {currentTab === 'PUBLISH' && <PublishTournament />} 
        </div>
      </div>
    </div>
  );
};

export default CreateTournament;

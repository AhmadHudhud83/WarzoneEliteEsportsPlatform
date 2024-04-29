import React from 'react';
import '../../TournamentSetup.css'; 

const Basics = ({ onNavigate }) => {
  
  return (
    <div className="container border">
    <div className="form-container">
      <div className="form-group">
        <label htmlFor="gameName" className="form-label">Selected Game</label>
        <input type="text" className="form-control" id="gameName" placeholder="" />
      </div>
      <div className="form-group">
        <label htmlFor="tournamentName" className="form-label">Tournament Name</label>
        <input type="text" className="form-control" id="tournamentName" placeholder="" />
      </div>
      <div className="row">
        <div className="col-6 form-group">
          <label htmlFor="startDate" className="form-label">Start Date</label>
          <input type="date" className="form-control" id="startDate" />
        </div>
        <div className="col-6 form-group">
          <label htmlFor="startTime" className="form-label">Start Time</label>
          <input type="time" className="form-control" id="startTime" defaultValue="19:00" />
        </div>
      </div>
      <div className="row">
        <div className="col-6 form-group">
          <label htmlFor="endDate" className="form-label">End Date</label>
          <input type="date" className="form-control" id="endDate" />
        </div>
        <div className="col-6 form-group">
          <label htmlFor="endTime" className="form-label">End Time</label>
          <input type="time" className="form-control" id="endTime" defaultValue="19:00" />
        </div>
      </div>
      <div className="row">
        <div className="col-6 form-group">
          <label htmlFor="registrationDeadline" className="form-label">Registration Deadline</label>
          <input type="date" className="form-control" id="registrationDeadline" />
        </div>
        <div className="col-6 form-group">
          <label htmlFor="deadlineTime" className="form-label">Deadline Time</label>
          <input type="time" className="form-control" id="deadlineTime" defaultValue="19:00" />
        </div>
      </div>
      <button type="button" className="btn btn-primary" onClick={() => onNavigate('INFO')}>Next</button>
    </div>
    </div>
  );
};

export default Basics;

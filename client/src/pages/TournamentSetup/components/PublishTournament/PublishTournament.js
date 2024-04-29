import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './PublishTournament.css'; 

const PublishTournament = () => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handlePublish = () => {
    setShowModal(false);
    console.log('Tournament published!');
    navigate('/success-route');
  };

  const handleBack = () => {

    navigate(-1); 
  };

  const handleCheckbox = (event) => {
    setIsAgreed(event.target.checked);
  };

  return (
    <div className="publish-tournament-container border">
      <div className="publish-header">
        <h2>PUBLISH</h2>
      </div>
      <div className="publish-content p-5  ">
        <p >
          Publishing this tournament will enable registration and allow players to join.<br />
          By publishing you agree to our website's policy and community standards.
        </p>
        <div className="checkbox-group">
          <input
            type="checkbox"
            id="policyAgreement"
            checked={isAgreed}
            onChange={handleCheckbox}
          />
          <label className='mx-4' htmlFor="policyAgreement">I agree to website's policy & community standards</label>
        </div>
        <div className="publish-buttons">
          <button className="btn btn-secondary my-4 mx-3" onClick={handleBack}>Back</button>
          <button className="btn btn-primary" onClick={() => setShowModal(true)} disabled={!isAgreed}>
            Publish
          </button>
        </div>
      </div>

      {}
      <div className="modal-container">
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Publishing Your Tournament</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
          <p class="text-success"> When you publish a tournament, players will be able to register. You will no longer be able to edit fields that affect registration.</p>
          <p class="text-success">Are you sure you want to publish the tournament?</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary me-3" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handlePublish}>
            Publish
          </button>
        </Modal.Footer>
      </Modal>  
      </div>
    </div>
  );
};

export default PublishTournament;
